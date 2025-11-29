import React, { useEffect, useState } from 'react';
import notificationApi from '../../api/notificationApi';
import Card from '../../components/UI/Card';

export default function Notifications() {
  const [list, setList] = useState([]);

  useEffect(() => {
    notificationApi.list().then(setList).catch(() => {});
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      <Card>
        <ul>
          {list.map((n) => (
            <li
              key={n.notificationId}
              className={`p-2 border-b ${n.isRead ? 'text-gray-500' : ''}`}
            >
              {n.message}{' '}
              <span className="text-xs text-gray-400">({n.type})</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
