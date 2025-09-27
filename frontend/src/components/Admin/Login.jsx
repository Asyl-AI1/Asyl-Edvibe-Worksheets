import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/admin/login', { username, password }, { withCredentials: true });
      if (res.data.success) navigate('/admin/dashboard');
    } catch {
      setErr('Invalid credentials');
    }
  };

  return (
    <div className="max-w-xs mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" className="w-full mb-2 p-2 border rounded" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" className="w-full mb-2 p-2 border rounded" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {err && <div className="text-red-500 mb-2">{err}</div>}
        <button className="bg-primary text-white px-4 py-2 rounded w-full">Login</button>
      </form>
    </div>
  );
}