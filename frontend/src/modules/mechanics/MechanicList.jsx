import React,{useEffect,useState} from 'react';
import mechanicApi from '../../api/mechanicApi';
import Card from '../../components/UI/Card';
import { useNavigate } from 'react-router-dom';

export default function MechanicList(){
  const [list,setList]=useState([]); 
  const nav = useNavigate();

  useEffect(()=> {
    mechanicApi.list().then(setList).catch(()=>{});
  },[]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Mechanics</h2>
        <button 
          onClick={()=>nav('/mechanics/new')} 
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <Card>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-2">Name</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Specialization</th>
              <th className="p-2">Experience</th>
            </tr>
          </thead>
          <tbody>
            {list.map(m => (
              <tr key={m.mechanicId} className="border-b hover:bg-gray-50 transition">
                <td className="p-2">{m.name}</td>
                <td className="p-2">{m.phone}</td>
                <td className="p-2">{m.specialization}</td>
                <td className="p-2">{m.experience} years</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
