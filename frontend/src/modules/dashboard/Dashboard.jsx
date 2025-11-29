import React, { useEffect, useState } from 'react';
import Card from '../../components/UI/Card';
import vehicleApi from '../../api/vehicleApi';
import serviceRequestApi from '../../api/serviceRequestApi';
import invoiceApi from '../../api/invoiceApi';

export default function Dashboard(){
  const [vehicles, setVehicles] = useState(0);
  const [requests, setRequests] = useState(0);
  const [invoices, setInvoices] = useState(0);

  useEffect(()=> {
    (async ()=>{
      try{
        const v = await vehicleApi.list(); setVehicles(Array.isArray(v)? v.length : 0);
        const r = await serviceRequestApi.list(); setRequests(Array.isArray(r)? r.length:0);
        const i = await invoiceApi.list(); setInvoices(Array.isArray(i)? i.length:0);
      }catch(e){}
    })();
  },[]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <div className="text-sm text-gray-500">Total Vehicles</div>
        <div className="text-2xl font-semibold">{vehicles}</div>
      </Card>
      <Card>
        <div className="text-sm text-gray-500">Service Requests</div>
        <div className="text-2xl font-semibold">{requests}</div>
      </Card>
      <Card>
        <div className="text-sm text-gray-500">Invoices</div>
        <div className="text-2xl font-semibold">{invoices}</div>
      </Card>
    </div>
  );
}
