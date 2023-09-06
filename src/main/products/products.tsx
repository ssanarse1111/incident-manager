import React, { useCallback, useEffect, useState } from 'react'
import Table from '../../styled-components/table/table'
import { useNavigate } from 'react-router-dom';
import { useHttp } from '../../hooks/useHttp';
import { Incident } from '../../models/incident';
import { TableHeader } from '../../models/tableHeader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store';

export const Products = () => {

    const navigate = useNavigate();
    // const hookData = useHttp({});
    const dispatch = useDispatch()

    const { data: productsList } = useSelector((state: any) => state.products);

    const [isProductsLoading, setIsProductsLoading] = useState(false);
    const [productsError, setProductsError] = useState('');

    const tableHeaders: TableHeader[] = [
        { id: '1', label: 'Product Number', name: 'number', dataType: 'string' },
        { id: '2', label: 'Product Image', name: 'image', dataType: 'image' },
        { id: '3', label: 'Name', name: 'name', dataType: 'string' },
        { id: '4', label: 'Price', name: 'price', dataType: 'number' },
        { id: '5', label: 'Quantity', name: 'quantity', dataType: 'number' },
        { id: '6', label: 'Specification', name: 'specification', dataType: 'string' }
    ];

    const [tableData, setTableData] = useState<Incident[]>([]);

    const { responseData: response, httpRequest: getAllIncidents } = useHttp();

    // Functions

    function onNewSelection() {
        navigate('/products/create-product', { state: { productNumber: productsList.length > 0 ? productsList[productsList.length - 1].number : 'PDT000000' } });
    }
    function onBackSelection() {
        navigate(-1);
    }

    const getRequestedData = useCallback((data: any[]) => {
        setTableData(data.reverse());
    }, []);

    function onItemClick(data: any) {
        console.log(data);
    }

    function convertArrayOfObjectsToCSV(data: any[]) {
        const keys = Object.keys(data[0]);
        const csv = [keys.join(',')];

        for (const obj of data) {
            const row = keys.map(key => obj[key]);
            csv.push(row.join(','));
        }

        return csv.join('\n');
    }

    function downloadData(event: any) {
        event.preventDefault();
        const csvData = convertArrayOfObjectsToCSV(tableData);

        const blob = new Blob([csvData], { type: 'text/csv' });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';

        a.click();

        window.URL.revokeObjectURL(url);
    }

    function selectedItems(data: any) { }

    function onActionSelection(action: any) {
        console.log('action');
    }

    // useEffect(() => {
    //     const getApi = setTimeout(() => {
    //         getAllIncidents({ url: 'http://localhost:3005/products/' }, getRequestedData);
    //     });
    //     return () => {
    //         clearTimeout(getApi);
    //     }
    // }, [getAllIncidents]);

    useEffect(() => {
        setIsProductsLoading(true);
        // console.log(dispatch(fetchProducts() as any));

        setTimeout(() => {
            dispatch(fetchProducts() as any)
                .unwrap()
                .catch((err: any) => setProductsError(err))
                .finally(() => setIsProductsLoading(false));
        }, 3000)
    }, [dispatch]);
    return (
        <>
            <button onClick={downloadData}>Download</button>
            <Table data={productsList.map((x: any) => ({ ...x })).reverse()} isLoading={isProductsLoading}
                errorMessage={productsError} tableHeaders={tableHeaders} isCheckboxSelection={true} onItemClick={onItemClick}
                onNewSelection={onNewSelection} onBackSelection={onBackSelection} selectedItems={selectedItems}
                onActionSelection={onActionSelection} />
        </>
    )
}