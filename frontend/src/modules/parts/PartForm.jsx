import React,{useState} from 'react';
import partsApi from '../../api/partsApi';
import { useNavigate } from 'react-router-dom';

export default function PartForm(){
  const [f,setF]=useState({partName:'',brand:'',unitPrice:0,type:''});
  const [saving,setSaving]=useState(false);
  const nav = useNavigate();
  const submit=async e=>{
    e.preventDefault();
    try{
      setSaving(true);
      await partsApi.create(f);
      nav('/parts');
    }catch(err){
      console.error('Add part error:', err);
      alert(err?.response?.data || err?.message || 'Failed to add part');
    }finally{ setSaving(false); }
  };
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Add Part</h2>
      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label><div className="text-sm">Name</div><input className="border p-2" value={f.partName} onChange={e=>setF({...f,partName:e.target.value})} /></label>
        <label><div className="text-sm">Brand</div><input className="border p-2" value={f.brand} onChange={e=>setF({...f,brand:e.target.value})} /></label>
        <label><div className="text-sm">Unit Price</div><input type="number" className="border p-2" value={f.unitPrice} onChange={e=>setF({...f,unitPrice: e.target.value ? Number(e.target.value) : 0})} /></label>
        <label><div className="text-sm">Type</div><input className="border p-2" value={f.type} onChange={e=>setF({...f,type:e.target.value})} /></label>
        <div className="col-span-full"><button type="submit" disabled={saving} className="px-4 py-2 bg-accent text-white rounded">{saving ? 'Saving...' : 'Save'}</button></div>
      </form>
    </div>
  );
}
