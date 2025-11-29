import React,{useState,useEffect} from 'react';
import partUsageApi from '../../api/partUsageApi';
import partsApi from '../../api/partsApi';
import serviceRecordApi from '../../api/serviceRecordApi';
import { useNavigate } from 'react-router-dom';

export default function PartUsageForm(){
  const [form,setForm]=useState({recordId:'',partId:'',quantity:1});
  const [parts,setParts]=useState([]); const [records,setRecords]=useState([]);
  const nav = useNavigate();
  useEffect(()=>{ partsApi.list().then(setParts); serviceRecordApi.list().then(setRecords); },[]);
  const submit=async e=>{ e.preventDefault(); await partUsageApi.create(form); nav('/service-records'); };
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Add Part Usage</h2>
      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label><div className="text-sm">Service Record</div>
          <select className="border p-2" value={form.recordId} onChange={e=>setForm({...form,recordId:e.target.value})}>
            <option value="">Select</option>{records.map(r=> <option key={r.recordId} value={r.recordId}>{r.recordId}</option>)}
          </select>
        </label>
        <label><div className="text-sm">Part</div>
          <select className="border p-2" value={form.partId} onChange={e=>setForm({...form,partId:e.target.value})}>
            <option value="">Select</option>{parts.map(p=> <option key={p.partId} value={p.partId}>{p.partName}</option>)}
          </select>
        </label>
        <label><div className="text-sm">Quantity</div><input type="number" min="1" className="border p-2" value={form.quantity} onChange={e=>setForm({...form,quantity:e.target.value})} /></label>
        <div className="col-span-full"><button className="px-4 py-2 bg-accent text-white rounded">Save</button></div>
      </form>
    </div>
  );
}
