import React, {useEffect, useState} from 'react';
import serviceRecordApi from '../../api/serviceRecordApi';
import Card from '../../components/UI/Card';
import { useNavigate } from 'react-router-dom';

export default function RecordList(){
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{ serviceRecordApi.list().then(setList).catch(()=>{}) },[]);
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Service Records</h2>
        <button onClick={()=>navigate('/service-records/new')} className="px-4 py-2 bg-accent text-white rounded">Add Record</button>
      </div>
      <Card>
        <table className="w-full">
          <thead><tr className="border-b"><th>ID</th><th>Vehicle</th><th>Date</th><th>Mechanic</th><th>Total</th></tr></thead>
          <tbody>
            {list.map(r=>(
              <tr key={r.recordId} className="border-b">
                <td>{r.recordId}</td><td>{r.vehicleId}</td><td>{r.serviceDate}</td><td>{r.mechanicId}</td><td>{r.totalCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
