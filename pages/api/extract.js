
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error in file upload' });
    }

    const pdfFile = files.pdf[0];
    const pdfPath = pdfFile.filepath;

    // Process the PDF and generate the Excel file
    const outputFilePath = path.join('/tmp', 'Extracted_Order_Details.xlsx');
    
    // Call the Python function to process the PDF and create Excel
    try {
      const pythonProcess = spawn('python3', ['scripts/process_pdf.py', pdfPath, outputFilePath]);

      pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          // File processed successfully, return the download URL
          res.status(200).json({ fileUrl: `/download/${path.basename(outputFilePath)}` });
        } else {
          res.status(500).json({ error: 'Failed to process PDF' });
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error during PDF processing' });
    }
  });
}
