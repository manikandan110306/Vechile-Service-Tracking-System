import React, {useEffect, useState} from 'react';
import serviceRecordApi from '../../api/serviceRecordApi';
import Card from '../../components/UI/Card';
import { useNavigate } from 'react-router-dom';

export default function RecordList(){
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    serviceRecordApi
      .list()
      .then((data) => setList(Array.isArray(data) ? data : data?.content || []))
      .catch(()=> setList([]));
  },[]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Service Records</h2>
        <button onClick={()=>navigate('/service-records/new')} className="px-4 py-2 bg-accent text-white rounded">Add Record</button>
      </div>

      <Card>
        <table className="w-full table-auto border-collapse text-left">
          <thead>
            <tr className="bg-gray-100 border-b text-gray-700">
              <th className="p-2">ID</th>
              <th className="p-2">Vehicle</th>
              <th className="p-2">Date</th>
              <th className="p-2">Mechanic</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>

          <tbody>
            {(list || []).map(r => (
              <tr key={r.recordId} className="border-b hover:bg-gray-50">
                <td className="p-2">{r.recordId}</td>
                <td className="p-2">{r.vehicle ? `${r.vehicle.vehicleNumber} ${r.vehicle.brand ? '- ' + r.vehicle.brand : ''}` : ''}</td>
                <td className="p-2">{r.serviceDate}</td>
                <td className="p-2">{r.mechanic ? r.mechanic.name : ''}</td>
                <td className="p-2">{r.totalCost ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
