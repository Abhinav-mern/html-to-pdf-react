import React, { useState } from "react";
export default function Main() {
  const [pdfUrl, setPdfUrl] = useState("");

  const fetchPDF = async () => {
    try {
      const response = await fetch("http://localhost:3001/main");
      const pdfBlob = await response.blob();
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      {!pdfUrl && (
        <>
          <h1>Main Page</h1>
          <button onClick={fetchPDF}>Fetch PDF</button>{" "}
        </>
      )}

      {pdfUrl && (
        <embed
          style={{ width: "100%", height: "100%" }}
          src={pdfUrl}
          type="application/pdf"
        />
      )}
    </div>
  );
}
