import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const StartupDashboard = () => {
  const [startup, setStartup] = useState(null);
  const { state } = useLocation();
  const { username } = state || {};
  const [salesData, setSalesData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the startups API
        const response = await fetch('https://fundrevbackend1.onrender.com/startups');
        if (response.ok) {
          const data = await response.json();
          // Find the startup with the specified username
          const foundStartup = data.startups.find((s) => s.username === username);
          setStartup(foundStartup);
        } else {
          console.error('Failed to fetch startups:', await response.json());
        }
      } catch (error) {
        console.error('Error during startup fetch:', error);
      }
    };

    fetchData();
  }, [username]); // Run whenever the username changes

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    try {
      // Read the contents of the file
      const fileContents = await readFile(file);
      console.log('Sales data:', fileContents);

      // Update state with sales data
      setSalesData(fileContents);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  // Function to read file contents
  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const contents = event.target.result;
        resolve(contents);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsText(file);
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ borderBottom: '2px solid #fff', paddingBottom: '10px' }}>Startup Dashboard</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ marginBottom: '10px' }}>{startup?.companyname}</h3>
        <input
          type="file"
          id="fileUpload"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <label htmlFor="fileUpload" style={{ cursor: 'pointer', padding: '4px', background: '#4CAF50', color: '#fff', borderRadius: '5px' }}>
          Update Sales
        </label>
      </div>
      {salesData && (
        <div style={{ marginTop: '20px', border: '2px solid #fff', padding: '20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <h4>Sales Data:</h4>
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', fontSize: '14px' }}>{salesData}</pre>
        </div>
      )}
      {startup && (
        <div style={{ marginTop: '20px', border: '2px solid #fff', padding: '20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <p style={{ marginBottom: '20px' }}>{startup.businessDescription}</p>

          {/* Display interested investors if available */}
          {startup.interested_investors && startup.interested_investors.length > 0 && (
            <div>
              <h4 style={{ marginBottom: '10px', fontSize: 16 }}>Interested Investors:</h4>
              <ul style={{ paddingLeft: '20px', fontSize: 14 }}>
                {startup.interested_investors.map((investor) => (
                  <li key={investor.email} style={{ marginBottom: '5px' }}>{investor.email}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StartupDashboard;
