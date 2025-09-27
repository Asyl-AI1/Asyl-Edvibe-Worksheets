import React, { useState } from 'react';
import axios from 'axios';

const LEVELS = ['A1','A2','B1','B2','C1','C2'];

export default function UploadForm() {
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState('A1');
  const [topic, setTopic] = useState('');
  const [tags, setTags] = useState('');
  const [pdf, setPdf] = useState(null);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pdf) return setMsg("Please select a PDF file");
    const formData = new FormData();
    formData.append('pdf', pdf);
    formData.append('title', title);
    formData.append('level', level);
    formData.append('topic', topic);
    formData.append('tags', tags);
    try {
      await axios.post('/api/admin/upload', formData, { withCredentials: true });
      setMsg("Uploaded!");
      setTitle(''); setTopic(''); setTags(''); setPdf(null);
    } catch (err) {
      setMsg("Upload failed");
    }
  };

  return (
    <form className="bg-white p-6 rounded shadow max-w-md mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Quick Upload</h2>
      <input type="text" placeholder="Title" className="w-full mb-2 p-2 border rounded" value={title} onChange={e => setTitle(e.target.value)} required />
      <select className="w-full mb-2 p-2 border rounded" value={level} onChange={e => setLevel(e.target.value)} required>
        {LEVELS.map(l => <option key={l}>{l}</option>)}
      </select>
      <input type="text" placeholder="Topic" className="w-full mb-2 p-2 border rounded" value={topic} onChange={e => setTopic(e.target.value)} />
      <input type="text" placeholder="Tags (comma separated)" className="w-full mb-2 p-2 border rounded" value={tags} onChange={e => setTags(e.target.value)} />
      <input type="file" accept="application/pdf" className="w-full mb-2" onChange={e => setPdf(e.target.files[0])} required />
      <button className="bg-primary text-white px-4 py-2 rounded w-full">Upload</button>
      {msg && <div className="mt-2 text-accent">{msg}</div>}
    </form>
  );
}