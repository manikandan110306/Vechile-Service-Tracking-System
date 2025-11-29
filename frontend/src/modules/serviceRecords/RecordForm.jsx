import React, {useEffect, useState} from 'react';
import serviceRecordApi from '../../api/serviceRecordApi';
import vehicleApi from '../../api/vehicleApi';
import mechanicApi from '../../api/mechanicApi';
import { useNavigate } from 'react-router-dom';

export default function RecordForm(){
  const [form, setForm] = useState({ vehicleId:'', requestId:'', serviceDate:'', description:'', totalCost:0, mechanicId:'' });
  const [vehicles, setVehicles] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(()=> { vehicleApi.list().then(setVehicles); mechanicApi.list().then(setMechanics); },[]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      // coerce types
      const payload = {
        vehicleId: Number(form.vehicleId),
        mechanicId: form.mechanicId ? Number(form.mechanicId) : undefined,
        requestId: form.requestId ? Number(form.requestId) : undefined,
        serviceDate: form.serviceDate,
        description: form.description,
        totalCost: Number(form.totalCost) || 0
      };

      await serviceRecordApi.create(payload);
      navigate('/service-records');
    } catch (err) {
      console.error('ServiceRecord create error:', err);
      alert(err?.response?.data || err?.message || 'Failed to create record');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Add Service Record</h2>
      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label><div className="text-sm text-gray-600">Vehicle</div>
          <select className="border p-2" value={form.vehicleId} onChange={e=>setForm({...form,vehicleId:e.target.value})}>
            <option value="">Select</option>{vehicles.map(v=> <option key={v.vehicleId} value={v.vehicleId}>{v.vehicleNumber}</option>)}
          </select>
        </label>
        <label><div className="text-sm text-gray-600">Mechanic</div>
          <select className="border p-2" value={form.mechanicId} onChange={e=>setForm({...form,mechanicId:e.target.value})}>
            <option value="">Select</option>{mechanics.map(m=> <option key={m.mechanicId} value={m.mechanicId}>{m.name}</option>)}
          </select>
        </label>
        <label><div className="text-sm text-gray-600">Service Date</div>
          <input type="date" className="border p-2" value={form.serviceDate} onChange={e=>setForm({...form,serviceDate:e.target.value})} />
        </label>
        <label><div className="text-sm text-gray-600">Total Cost</div>
          <input type="number" className="border p-2" value={form.totalCost} onChange={e=>setForm({...form,totalCost:e.target.value})} />
        </label>
        <label className="col-span-full"><div className="text-sm text-gray-600">Description</div>
          <textarea className="border p-2 w-full" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        </label>
        <div className="col-span-full">
          <button type="submit" disabled={saving} className="px-4 py-2 bg-accent text-white rounded disabled:opacity-60">{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </form>
    </div>
  );
}
