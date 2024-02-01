// src/components/InvestorDashboard.js
import React, { useState, useEffect } from 'react';
import StartupCard from './startupCard';
import { useLocation } from 'react-router-dom';


const InvestorDashboard = () => {
  const [startups, setStartups] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const { state } = useLocation();
  const { username, email } = state || {};
  console.log("State:", state);


  const handleInterestedClick = async (startupUsername) => {
    try {
      // Make a POST request to the 'interested' API
      const response = await fetch('http://localhost:8080/interested', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ startupUsername, investorEmail: email}), 
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        setShowPopup(true);
      } else {
        console.error('Error expressing interest:', await response.json());
      }
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the startups API
        const response = await fetch('http://localhost:8080/startups');
        if (response.ok) {
          const data = await response.json();
          setStartups(data.startups);
        } else {
          console.error('Failed to fetch startups:', await response.json());
        }
      } catch (error) {
        console.error('Error during startup fetch:', error);
      }
    };

    fetchData();
  }, []); // Run only once on component mount

  

  return (
    <div>
      <h2 style={{ borderBottom: '2px solid #fff', paddingBottom: '10px' }}>Investor Dashboard</h2>
      <p>Explore Startups and show your interest!</p>

      {/* Render StartupCard for each startup */}
      {startups.map((startup) => (
        <StartupCard
          key={startup.username}
          username={startup.username}
          companyName={startup.companyname}
          businessDescription={startup.businessDescription}
          onInterestedClick={handleInterestedClick}
        />
      ))}
       {showPopup && (
        <div style={{ width:100,position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', background: '#4CAF50', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '5px' }}>
          <p>Sent!</p>
          <button onClick={closePopup}>OK</button>
        </div>
      )}
    </div>
  );
};

export default InvestorDashboard;
