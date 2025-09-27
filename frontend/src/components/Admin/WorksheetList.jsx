import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function WorksheetList() {
  const [worksheets, setWorksheets] = useState([]);

  useEffect(() => {
    axios.get('/api/worksheets').then(res => setWorksheets(res.data.worksheets));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this worksheet?")) return;
    await axios.delete(`/api/admin/worksheets/${id}`, { withCredentials: true });
    setWorksheets(ws => ws.filter(w => w.id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">All Worksheets</h2>
      <table className="w-full bg-white rounded shadow text-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Level</th>
            <th>Topic</th>
            <th>Tags</th>
            <th>Downloads</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {worksheets.map(w => (
            <tr key={w.id}>
              <td>{w.id}</td>
              <td>{w.title}</td>
              <td>{w.level}</td>
              <td>{w.topic}</td>
              <td>{w.tags}</td>
              <td>{w.downloads}</td>
              <td>
                <button className="text-accent underline" onClick={() => handleDelete(w.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}