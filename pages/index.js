
import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data?.fileUrl) {
        // Create a link to download the Excel file
        const link = document.createElement('a');
        link.href = data.fileUrl;
        link.download = 'Extracted_Order_Details.xlsx';
        link.click();
      } else {
        alert('Error: Failed to generate Excel file.');
      }
    } catch (error) {
      alert('Error: Something went wrong while processing the PDF.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="border p-2 mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Upload PDF'}
        </button>
      </form>
    </div>
  );
}
