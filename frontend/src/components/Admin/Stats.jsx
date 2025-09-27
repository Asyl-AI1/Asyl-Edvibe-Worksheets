import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Stats() {
  const [top, setTop] = useState([]);
  const [overview, setOverview] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/stats/top', { withCredentials: true }).then(res => setTop(res.data.top));
    axios.get('/api/admin/stats/overview', { withCredentials: true }).then(res => setOverview(res.data.overview));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Download Stats</h2>
      <div className="mb-4">
        <h3 className="font-semibold mb-1">Top 10 Worksheets</h3>
        <ul>
          {top.map(ws => (
            <li key={ws.id}>{ws.title}: <span className="text-primary">{ws.downloads}</span></li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-1">Overview by Level</h3>
        <table className="w-full bg-white rounded shadow text-sm">
          <thead>
            <tr>
              <th>Level</th>
              <th># Worksheets</th>
              <th>Total Downloads</th>
            </tr>
          </thead>
          <tbody>
            {overview.map(l => (
              <tr key={l.level}>
                <td>{l.level}</td>
                <td>{l.count}</td>
                <td>{l.downloads || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}