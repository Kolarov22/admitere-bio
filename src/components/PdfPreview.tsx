'use client';
import React from 'react'
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;



interface PdfPreviewProps {
    pdfURL: string;
}

const PdfPreview = ({pdfURL}:PdfPreviewProps) => {
  return (
    <div>
        <Document file={pdfURL}>
         <Page pageNumber={1}/>
      </Document>
    </div>
  )
}

export default PdfPreview