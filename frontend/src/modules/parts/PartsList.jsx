import React,{useState,useEffect} from 'react';
import partsApi from '../../api/partsApi';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/UI/Card';

export default function PartsList(){
  const [parts,setParts]=useState([]); const nav=useNavigate();
  useEffect(()=> partsApi.list().then(setParts).catch(()=>{}),[]);
  return (
    <div>
      <div className="flex justify-between items-center mb-4"><h2 className="text-xl">Spare Parts</h2><button onClick={()=>nav('/parts/new')} className="px-4 py-2 bg-accent text-white rounded">Add Part</button></div>
      <Card>
        <table className="w-full">
          <thead><tr className="border-b"><th>Name</th><th>Brand</th><th>Price</th><th>Type</th></tr></thead>
          <tbody>{parts.map(p=> <tr key={p.partId} className="border-b"><td>{p.partName}</td><td>{p.brand}</td><td>{p.unitPrice}</td><td>{p.type}</td></tr>)}</tbody>
        </table>
      </Card>
    </div>
  );
}
