import React,{useState} from 'react';
import mechanicApi from '../../api/mechanicApi';
import { useNavigate } from 'react-router-dom';

export default function MechanicForm(){
  const [f,setF]=useState({name:'',phone:'',specialization:'',experience:''}); const nav=useNavigate();
  const submit=async e=>{ e.preventDefault(); await mechanicApi.create(f); nav('/mechanics'); };
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Add Mechanic</h2>
      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label><div className="text-sm">Name</div><input className="border p-2" value={f.name} onChange={e=>setF({...f,name:e.target.value})} /></label>
        <label><div className="text-sm">Phone</div><input className="border p-2" value={f.phone} onChange={e=>setF({...f,phone:e.target.value})} /></label>
        <label><div className="text-sm">Specialization</div><input className="border p-2" value={f.specialization} onChange={e=>setF({...f,specialization:e.target.value})} /></label>
        <label><div className="text-sm">Experience (years)</div><input className="border p-2" value={f.experience} onChange={e=>setF({...f,experience:e.target.value})} /></label>
        <div className="col-span-full"><button className="px-4 py-2 bg-accent text-white rounded">Save</button></div>
      </form>
    </div>
  );
}
