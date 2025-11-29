import React,{useEffect,useState} from 'react';
import invoiceApi from '../../api/invoiceApi';
import { useParams } from 'react-router-dom';
import Card from '../../components/UI/Card';

export default function InvoiceDetails(){
  const { id } = useParams();
  const [inv,setInv]=useState(null);
  useEffect(()=> invoiceApi.get(id).then(setInv).catch(()=>{}),[id]);
  if(!inv) return <div>Loading...</div>;
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Invoice #{inv.invoiceId}</h2>
      <div><strong>Record:</strong> {inv.recordId}</div>
      <div><strong>Amount:</strong> {inv.amount}</div>
      <div><strong>Tax:</strong> {inv.tax}</div>
      <div><strong>Total:</strong> {inv.totalAmount}</div>
      <div><strong>Payment Status:</strong> {inv.paymentStatus}</div>
    </Card>
  );
}
