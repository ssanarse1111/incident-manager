import React, { useCallback, useEffect, useState } from 'react'
import { Incident } from '../../models/incident'
import { useNavigate } from 'react-router-dom';
import { TableHeader } from '../../models/tableHeader';
import Table from '../../styled-components/table/table';
import { useHttp } from '../../hooks/useHttp';

const Incidents = () => {

  const navigate = useNavigate();
  // const hookData = useHttp({});

  const tableHeaders: TableHeader[] = [
    { id: '1', label: 'Incident Number', name: 'number', dataType: 'string' },
    { id: '2', label: 'Caller', name: 'caller', dataType: 'reference' },
    { id: '3', label: 'Assigned To', name: 'assignedTo', dataType: 'reference' },
    { id: '4', label: 'State', name: 'state', dataType: 'choice' },
    { id: '5', label: 'Priority', name: 'priority', dataType: 'choice' },
    { id: '6', label: 'Description', name: 'description', dataType: 'string' },
    { id: '7', label: 'Notes', name: 'notes', dataType: 'string' },
  ];

  const [tableData, setTableData] = useState<Incident[]>([]);

  const { responseData: response, httpRequest: getAllIncidents } = useHttp();

  // Functions

  function onNewSelection() {
    navigate('/incidents/create-incident', { state: { incidentNumber: tableData[0].number } });
  }
  function onBackSelection() {
    navigate(-1);
  }

  const getRequestedData = useCallback((data: any[]) => {
    setTableData(data);
  }, []);

  function onItemClick(data: any) {
    console.log(data);
  }

  function selectedItems(data: any) { }

  function onActionSelection(action: any) {
    console.log('action');
  }

  useEffect(() => {
    const getApi = setTimeout(() => {
      getAllIncidents({ url: 'http://localhost:3005/incidents/' }, getRequestedData);
    });
    return () => {
      clearTimeout(getApi);
    }
  }, [getAllIncidents]);

  return (
    <>
      <Table data={tableData} isLoading={response.isLoading} tableHeaders={tableHeaders} isCheckboxSelection={true} onItemClick={onItemClick}
        onNewSelection={onNewSelection} onBackSelection={onBackSelection} selectedItems={selectedItems}
        onActionSelection={onActionSelection} />
    </>
  )
}

export default React.memo(Incidents);




  // const tableData: Incident[] = [
  //   { id: 'b8742c9e-1338-41e5-9f64-9e90ad66f46e', number: 'INC000003', caller: 'Swamiraj', assignedTo: 'Krishna', state: 'New', priority: 'Medium', description: 'Test INC', notes: 'test' },
  //   { id: 'e8ffb17c-2360-4117-bdbd-932eaeeb0d78', number: 'INC000002', caller: 'Shrikant', assignedTo: 'Saurabh', state: 'New', priority: 'Medium', description: 'Test INC', notes: 'test' },
  //   { id: 'fbcef04d-aba1-4862-9063-662d97e70f81', number: 'INC000001', caller: 'Anarse', assignedTo: 'Ganesh', state: 'New', priority: 'Medium', description: 'Test INC', notes: 'test' }
  // ];
