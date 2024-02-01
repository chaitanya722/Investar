// src/components/StartupCard.js
import React from 'react';

const StartupCard = ({ username, companyName, businessDescription, onInterestedClick }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', margin: '25px', borderRadius: '5px', textAlign: 'left', position: 'relative' }}>
      <h3>{companyName}</h3>
      <p>Business Description: {businessDescription}</p>
      <button
        style={{ position: 'absolute', top: '10px', right: '10px', padding: '5px', fontSize: '14px' }}
        onClick={() => onInterestedClick(username)}
      >
        Interested
      </button>
    </div>
  );
};

export default StartupCard;
