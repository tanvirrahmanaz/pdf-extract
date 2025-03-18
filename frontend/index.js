// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('pdf', file);
    
    const res = await fetch('/api/extract', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();
    setData(result);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button type="submit">Upload PDF</button>
      </form>
      
      <div>
        {data && (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Deliver To</th>
                <th>Phone</th>
                <th>Delivery Address</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row['Order ID']}</td>
                  <td>{row['Order Date']}</td>
                  <td>{row['Deliver To']}</td>
                  <td>{row['Phone']}</td>
                  <td>{row['Delivery Address']}</td>
                  <td>{row['Total']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
