import React,{useEffect,useState} from 'react';
import mechanicApi from '../../api/mechanicApi';
import Card from '../../components/UI/Card';
import { useNavigate } from 'react-router-dom';

export default function MechanicList(){
  const [list,setList]=useState([]); const nav = useNavigate();
  useEffect(()=> mechanicApi.list().then(setList).catch(()=>{}),[]);
  return (
    <div>
      <div className="flex justify-between items-center mb-4"><h2 className="text-xl">Mechanics</h2><button onClick={()=>nav('/mechanics/new')} className="px-4 py-2 bg-accent text-white rounded">Add</button></div>
      <Card>
        <table className="w-full">
          <thead><tr className="border-b"><th>Name</th><th>Phone</th><th>Specialization</th><th>Experience</th></tr></thead>
          <tbody>{list.map(m=> <tr key={m.mechanicId} className="border-b"><td>{m.name}</td><td>{m.phone}</td><td>{m.specialization}</td><td>{m.experience}</td></tr>)}</tbody>
        </table>
      </Card>
    </div>
  );
}
