import React from 'react';

const LEVELS = ['A1','A2','B1','B2','C1','C2'];

export default function LevelFilter({ selected, onChange }) {
  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {LEVELS.map(level => (
        <button
          key={level}
          className={`px-3 py-1 rounded shadow ${selected === level ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
          onClick={() => onChange(level)}
        >
          {level}
        </button>
      ))}
    </div>
  );
}