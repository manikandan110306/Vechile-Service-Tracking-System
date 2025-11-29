import React,{useEffect,useState} from 'react';
import feedbackApi from '../../api/feedbackApi';
import Card from '../../components/UI/Card';

export default function FeedbackList(){
  const [list,setList]=useState([]);
  useEffect(()=> feedbackApi.list().then(setList).catch(()=>{}),[]);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Feedback</h2>
      <Card>
        <table className="w-full">
          <thead><tr className="border-b"><th>User</th><th>Record</th><th>Rating</th><th>Comments</th></tr></thead>
          <tbody>{list.map(f=> <tr key={f.feedbackId} className="border-b"><td>{f.userId}</td><td>{f.serviceRecordId}</td><td>{f.rating}</td><td>{f.comments}</td></tr>)}</tbody>
        </table>
      </Card>
    </div>
  );
}

