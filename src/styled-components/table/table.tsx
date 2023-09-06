import React, { useCallback, useEffect, useState } from 'react'
import { TableHeader } from '../../models/tableHeader';

class TableProps {
    data: any[] = [];
    tableHeaders: TableHeader[] = [];
    isLoading?: boolean = false;
    isCheckboxSelection?: boolean = false;
    onItemClick?: any = ({ }) => { };
    onNewSelection?: any = () => { };
    onBackSelection?: any = () => { };
    selectedItems?: any = (data: any) => { };
    onActionSelection?: any = (event: any) => { };
    errorMessage?: string;
}

const Table = (props: TableProps) => {

    const [selectedData, setSelectedData] = useState<any[]>([]);
    const [selectAll, setSelectAll] = useState<boolean>(false);

    const actionOptions = [
        { id: '1', label: 'Delete', children: [] },
        {
            id: '2', label: 'Export', children: [
                { id: '2.1', label: 'Excel', children: [] },
                { id: '2.2', label: 'PDF', children: [] }
            ]
        },
    ];

    // Effects
    useEffect(() => {
        props.selectedItems(selectedData);
    }, [selectedData]);

    // Functions
    function selectAllData(event: any) {
        setSelectAll(event.target.checked);
        for (let i = 0; i < props.data.length; i++) {
            const checkboxes = document.getElementById(i.toString()) as HTMLInputElement;
            checkboxes.checked = event.target.checked;
        }
        setSelectedData(event.target.checked ? props.data : []);
    }

    const onDataSelection = useCallback((event: any, item: any) => {
        if (event.target.checked) {
            setSelectedData([...selectedData, item]);
        } else {
            const findIndex = selectedData.findIndex(x => x === item);
            const removedData = selectedData.filter((x: any, i: number) => i !== findIndex);
            setSelectedData(removedData);
        }
    }, [props.data]);

    const onItemClick = useCallback((item: any, dataIndex: number, header: any, headerIndex: number) => {
        props.onItemClick({ item, dataIndex, header, headerIndex });
    }, [props.data]);

    const create = useCallback((event: any) => {
        event.preventDefault();
        props.onNewSelection();
    }, [props.data]);

    const back = useCallback((event: any) => {
        event.preventDefault();
        props.onBackSelection();
    }, [props.data]);

    const onActionSelection = useCallback((event: any, action: any) => {
        event.preventDefault();
        action.children.length === 0 && props.onActionSelection();
    }, [props.data]);

    return (

        <div>
            <div className="d-grid gap-2 d-md-flex my-3">
                <button className="btn btn-outline-primary" type="button" onClick={back}>Back</button>
                <div className="dropdown ms-auto">
                    <button className="btn btn-light dropdown-toggle border" type="button" data-bs-auto-close="false" data-bs-toggle="dropdown" aria-expanded="false">
                        Actions on Selected Items
                    </button>
                    <ul className="dropdown-menu dropend">
                        {actionOptions.map(action => (
                            <li key={action.id}>
                                <button className={`dropdown-item ${action.children.length > 0 && 'dropdown-toggle'}`} type="button"
                                    id={action.id.toString() + action.label} onClick={(event: any) => onActionSelection(event, action)}
                                    data-bs-toggle={action.children.length > 0 && 'dropdown'}  >
                                    {action.label}
                                </button>
                                {action.children.length > 0 &&
                                    <ul className="dropdown-menu">
                                        {action.children.map(child => (
                                            <li key={child.id}>
                                                <button className="dropdown-item" type="button" id={child.id.toString() + child.label}
                                                    onClick={(event: any) => onActionSelection(event, child)} >
                                                    {child.label}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>}
                            </li>
                        ))}
                    </ul>
                </div>
                <button className="btn btn-primary" type="button" onClick={create}>New</button>
            </div>
            <table className="table table-striped table-hover table-responsive">
                <thead>
                    <tr>
                        {props.isCheckboxSelection &&
                            <th scope='col'>
                                <input className="form-check-input" type="checkbox" checked={selectAll} id="selectAllCheckbox"
                                    onChange={selectAllData} />
                            </th>
                        }
                        {props.tableHeaders.map(header => (
                            <th key={header.id} scope="col">{header.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.data && props.data.length > 0 && props.data.map((item: any, dataIndex: number) => (
                        <tr key={item.id ? item.id : dataIndex.toString()}>
                            {props.isCheckboxSelection &&
                                <td>
                                    <input className="form-check-input" type="checkbox" value={item.id} id={dataIndex.toString()}
                                        onChange={(event: any) => onDataSelection(event, item)} />
                                </td>
                            }
                            {props.tableHeaders.map((header: any, headerIndex: number) => (
                                <td key={header.id} onClick={() => onItemClick(item, dataIndex, header, headerIndex)}>
                                    {header.dataType === 'image' ?
                                        <img src={item[header.name]} height={50} width={50} id={'productImage' + headerIndex} />
                                        :
                                        <span>{item[header.name]}</span>
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {!props.isLoading ? props.data.length === 0 && <h3 className='text-center'>No Data Found</h3> :
                (
                    <div className='text-center'>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )
            }
            {props.errorMessage && <div className='text-danger text-center p-2'>{props.errorMessage}</div>}
        </div>
    )
}

export default React.memo(Table);
