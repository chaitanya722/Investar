import React from 'react';
import Signup from './components/sign_up';
import InvestorDashboard from './components/investordash';
import StartupDashboard from './components/startupdash';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  

import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
       
      <Router>
      <Routes>
        <Route path="/investor" element={<InvestorDashboard />} />
        <Route path="/startup" element={<StartupDashboard />} />
        <Route path="/" element={<Signup />} />
      </Routes>
    </Router>
  
        {/* <Signup /> */}
        
      </header>
      
    </div>
  );
}

export default App;
