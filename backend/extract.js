
// pages/api/extract.js
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).send('Error in file upload');
    const pdfFile = files.pdf[0];
    
    const pdfPath = pdfFile.filepath;

    // Example function call could be like: 
    const extractedData = await processPDF(pdfPath);
    res.status(200).json(extractedData);
  });
}

async function processPDF(pdfPath) {
  // Example: make an API call to your Python code or use a Vercel serverless function
  const response = await fetch('/path-to-your-python-api', { method: 'POST', body: pdfPath });
  const data = await response.json();
  return data;
}
