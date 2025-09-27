import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WorksheetCard from '../components/WorksheetCard';
import PDFModal from '../components/PDFModal';
import axios from 'axios';

export default function LevelPage() {
  const { level } = useParams();
  const [worksheets, setWorksheets] = useState([]);
  const [modalUrl, setModalUrl] = useState(null);

  useEffect(() => {
    axios.get(`/api/worksheets?level=${level}`).then(res => {
      setWorksheets(res.data.worksheets);
    });
  }, [level]);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Worksheets — Level {level}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {worksheets.map(ws => (
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