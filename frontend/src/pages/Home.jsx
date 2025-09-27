import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorksheetCard from '../components/WorksheetCard';
import PDFModal from '../components/PDFModal';
import heroImg from '../assets/hero.png';
import axios from 'axios';

export default function Home() {
  const [popular, setPopular] = useState([]);
  const [modalUrl, setModalUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/worksheets').then(res => {
      setPopular(res.data.worksheets.slice(0, 4));
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center gap-8 py-8">
        <img src={heroImg} alt="Hero" className="w-32 h-32 rounded-full shadow-lg" />
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Welcome to Asyl Edvibe Worksheets!</h1>
          <p className="text-gray-700 mb-3">
            Browse, preview, and download English worksheets by CEFR level.<br />
            <span className="text-accent font-semibold">Popular:</span>
          </p>
          <div className="flex gap-2 flex-wrap">
            {['A1','A2','B1','B2','C1','C2'].map(level => (
              <button key={level} className="bg-primary text-white px-3 py-1 rounded shadow" onClick={() => navigate(`/level/${level}`)}>{level}</button>
            ))}
          </div>
        </div>
      </div>
      <h2 className="text-xl font-semibold my-4">Featured Worksheets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {popular.map(ws => (
          <WorksheetCard
            key={ws.id}
            worksheet={ws}
            onPreview={() => setModalUrl(`/api/worksheets/${ws.id}/preview`)}
            onDownload={() => window.open(`/api/worksheets/${ws.id}/download`, '_blank')}
          />
        ))}
      </div>
      <PDFModal url={modalUrl} onClose={() => setModalUrl(null)} />
    </div>
  );
}