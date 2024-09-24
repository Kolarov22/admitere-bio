'use client';
import { useState } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Button } from "./ui/button";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();


interface PdfPreviewProps {
  pdfUrl: string;
}

const PdfPreview = (props: PdfPreviewProps) => {
   const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  // Function to handle successful document load and set the number of pages
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setPageNumber(1); // Reset to the first page whenever a new document is loaded
  }

  // Function to handle going to the next page
  const goToNextPage = () => {
    if (pageNumber < (numPages || 0)) {
      setPageNumber(pageNumber + 1);
    }
  };

  // Function to handle going to the previous page
  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <main className=" overflow-x-hidden">
    <div className="flex flex-col md:flex-row justify-center items-center ">
      <Button asChild className="order-last mt-1 md:order-first">
        <button onClick={goToPreviousPage} disabled={pageNumber <= 1}>
          Previous
        </button>
      </Button>

      <Document file={props.pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>

      
        <Button asChild className="mt-1">
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= (numPages || 0)}
          >
            Next
          </button>
        </Button>

      
    </div>

    <p className="text-center mt-10">
        Page {pageNumber} of {numPages}
    </p>
    </main>
  );
};



export default PdfPreview