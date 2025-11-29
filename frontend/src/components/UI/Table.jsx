import React from 'react';
export default function Table({ columns=[], data=[], loading=false, rowKey='id' }) {
  if (loading) return <div>Loading...</div>;
  if (!data || data.length===0) return <div className="p-4 text-gray-500">No records found</div>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            {columns.map((c,i)=> <th key={i} className="px-3 py-2 text-sm text-gray-600">{c.header}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row[rowKey] || JSON.stringify(row)} className="border-b">
              {columns.map((c,idx)=>(
                <td key={idx} className="px-3 py-2 align-top">
                  {typeof c.accessor === 'function' ? c.accessor(row) : row[c.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
