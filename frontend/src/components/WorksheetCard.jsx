import React from 'react';
import downloadIcon from '../assets/icons/download.svg';

export default function WorksheetCard({ worksheet, onPreview, onDownload }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between h-full">
      <div>
        <h3 className="text-lg font-semibold mb-1">{worksheet.title}</h3>
        <div className="text-sm text-gray-500 mb-2">Level: <span className="font-bold">{worksheet.level}</span></div>
        <div className="flex flex-wrap gap-1">
          {worksheet.tags && worksheet.tags.split(',').map(t => (
            <span key={t} className="bg-primary text-white px-2 py-0.5 rounded text-xs">{t.trim()}</span>
          ))}
        </div>
      </div>
      <div className="mt-2 flex gap-2">
        <button className="bg-accent text-white px-3 py-1 rounded hover:brightness-90" onClick={onPreview}>
          Preview
        </button>
        <button className="bg-primary text-white px-3 py-1 rounded flex gap-1 items-center hover:brightness-90" onClick={onDownload}>
          <img src={downloadIcon} alt="Download" className="h-4" />
          Download
        </button>
      </div>
      <div className="mt-1 text-xs text-gray-400">Downloads: {worksheet.downloads}</div>
    </div>
  );
}