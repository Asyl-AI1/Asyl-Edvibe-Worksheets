import React, { useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/web/pdf_viewer.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PDFModal({ url, onClose }) {
  const viewerRef = useRef();

  useEffect(() => {
    if (!url) return;
    const container = viewerRef.current;
    container.innerHTML = '';
    pdfjsLib.getDocument(url).promise.then(pdf => {
      pdf.getPage(1).then(page => {
        const viewport = page.getViewport({ scale: 1.2 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        container.appendChild(canvas);
        page.render({ canvasContext: canvas.getContext('2d'), viewport });
      });
    });
  }, [url]);

  if (!url) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-30">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full relative">
        <button className="absolute top-2 right-2 text-accent font-bold" onClick={onClose}>✕</button>
        <div ref={viewerRef} className="pdf-viewer overflow-auto" style={{ minHeight: 400 }}></div>
        <div className="mt-2 text-right">
          <a href={url} target="_blank" rel="noopener" className="text-primary underline">Open full PDF</a>
        </div>
      </div>
    </div>
  );
}