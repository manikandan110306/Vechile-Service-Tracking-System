import React, {useEffect,useState} from 'react';
import invoiceApi from '../../api/invoiceApi';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/UI/Card';

export default function InvoiceList(){
  const [list,setList]=useState([]); const nav = useNavigate();
  useEffect(()=> invoiceApi.list().then(setList).catch(()=>{}),[]);
  return (
    <div>
      <div className="flex justify-between items-center mb-4"><h2 className="text-xl">Invoices</h2></div>
      <Card>
        <table className="w-full">
          <thead><tr className="border-b"><th>ID</th><th>Record</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>{list.map(i=> <tr key={i.invoiceId} className="border-b"><td>{i.invoiceId}</td><td>{i.recordId}</td><td>{i.totalAmount}</td><td>{i.paymentStatus}</td><td><button onClick={()=>nav(`/invoices/${i.invoiceId}`)} className="text-blue-600">View</button></td></tr>)}</tbody>
        </table>
      </Card>
    </div>
  );
}
