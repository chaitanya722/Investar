// src/components/Sign_up.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sign_up = () => {
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  const [signupFormData, setSignupFormData] = useState({
    username: '',
    email: '',
    password: '',
    companyName: '', // New field for startup
    businessDescription: '', // New field for startup
  });

  const [loginFormData, setLoginFormData] = useState({
    loginUsername: '',
    loginEmail:'',
    loginPassword: '',
  });

  const handleChange = (e, formType) => {
    if (formType === 'signup') {
      setSignupFormData({
        ...signupFormData,
        [e.target.name]: e.target.value,
      });
    } else if (formType === 'login') {
      setLoginFormData({
        ...loginFormData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setShowSignupForm(true);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data for the signup API call
    const apiData = {
      username: signupFormData.username,
      email: signupFormData.email,
      password: signupFormData.password,
      usertype: userType,
      companyname: signupFormData.companyName, // Include new field for startup
      businessDescription: signupFormData.businessDescription, // Include new field for startup
    };

    try {
      // Make a POST request to the signup API (replace with the actual signup API endpoint)
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        console.log('Signup successful!');
        // Optionally, you can redirect the user or perform other actions
      } else {
        console.error('Signup failed:', await response.json());
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare the data for the login API call
    const loginApiData = {
      username: loginFormData.loginUsername,
      email:loginFormData.loginEmail,
      password: loginFormData.loginPassword,
    };
  
    try {
      // Make a POST request to the login API (replace with the actual login API endpoint)
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginApiData),
      });
  
      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        // Fetch user type based on the entered username
        const userTypeResponse = await fetch(`http://localhost:8080/usertype?username=${loginApiData.username}`);
        const userTypeData = await userTypeResponse.json();
  
        console.log('Login successful!');
        // Pass user information to the dashboard
        navigate(`/${userTypeData.usertype}`, { state: { username: loginApiData.username, email: loginApiData.email } });
  
        // Optionally, you can redirect the user or perform other actions based on user type
      } else {
        console.error('Login failed:', await response.json());
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  const renderDashboard = () => {
    // Conditionally render dashboard based on user type
    if (userType === 'investor') {
    } else if (userType === 'startup') {
    } else {
      return <p>User Dashboard</p>; // You can customize this based on your needs
    }
  };
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {!showSignupForm && !showLoginForm && (
        <div>
          <h2>Welcome to Fundrev</h2>
          <p>Are you:</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              style={{ margin: '0 10px', paddingLeft: '20px', paddingRight: '20px', fontSize: '16px' }}
              onClick={() => handleUserTypeChange('investor')}
            >
              Investor
            </button>
            <button
              style={{ margin: '0 10px', paddingLeft: '20px', paddingRight: '20px', fontSize: '16px' }}
              onClick={() => handleUserTypeChange('startup')}
            >
              Startup
            </button>
          </div>
          <p style={{ marginTop: '25px' }}>
            Already a user?{' '}
            <button onClick={() => setShowLoginForm(true)}>Login</button>
          </p>
        </div>
      )}
      {showSignupForm && (
        <div style={{ marginTop: '10px', width: '300px', margin: 'auto' }}>
          <h3>Please complete the Sign up</h3>
          <form onSubmit={handleSignupSubmit}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '16px', textAlign: 'left' }}>
              Username:
              <input
                type="text"
                name="username"
                value={signupFormData.username}
                onChange={(e) => handleChange(e, 'signup')}
                required
                style={{ width: '100%', padding: '5px', fontSize: '16px' }}
              />
            </label>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '16px', textAlign: 'left' }}>
              Email:
              <input
                type="email"
                name="email"
                value={signupFormData.email}
                onChange={(e) => handleChange(e, 'signup')}
                required
                style={{ width: '100%', padding: '5px', fontSize: '16px' }}
              />
            </label>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '16px', textAlign: 'left' }}>
              Password:
              <input
                type="password"
                name="password"
                value={signupFormData.password}
                onChange={(e) => handleChange(e, 'signup')}
                required
                style={{ width: '100%', padding: '5px', fontSize: '16px' }}
              />
            </label>
            {userType === 'startup' && (
            <>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '16px', textAlign: 'left' }}>
                Company Name:
                <input
                  type="text"
                  name="companyName"
                  value={signupFormData.companyName}
                  onChange={(e) => handleChange(e, 'signup')}
                  required
                  style={{ width: '100%', padding: '5px', fontSize: '16px' }}
                />
              </label>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '16px', textAlign: 'left' }}>
                Business Description:
                <input
                  type="text"
                  name="businessDescription"
                  value={signupFormData.businessDescription}
                  onChange={(e) => handleChange(e, 'signup')}
                  required
                  style={{ width: '100%', padding: '5px', fontSize: '16px' }}
                />
              </label>
            </>
          )}

            <button
              type="submit"
              style={{ width: '312px', marginTop: '15px', padding: '5px', fontSize: '16px', background: '#4CAF50', color: 'white' }}
            >
              Sign Up
            </button>
          </form>
        </div>
      )}
      {showLoginForm && (
        <div style={{ marginTop: '10px', width: '300px', margin: 'auto' }}>
          <h3>Login to your account</h3>
          <form onSubmit={handleLoginSubmit}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '16px', textAlign: 'left' }}>
              Username:
              <input
                type="text"
                name="loginUsername"
                value={loginFormData.loginUsername}
                onChange={(e) => handleChange(e, 'login')}
                required
                style={{ width: '100%', padding: '5px', fontSize: '16px' }}
              />
            </label>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '16px', textAlign: 'left' }}>
              Email:
              <input
                type="email"
                name="loginEmail"
                value={loginFormData.loginEmail}
                onChange={(e) => handleChange(e, 'login')}
                required
                style={{ width: '100%', padding: '5px', fontSize: '16px' }}
              />
            </label>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '16px', textAlign: 'left' }}>
              Password:
              <input
                type="password"
                name="loginPassword"
                value={loginFormData.loginPassword}
                onChange={(e) => handleChange(e, 'login')}
                required
                style={{ width: '100%', padding: '5px', fontSize: '16px' }}
              />
            </label>
            <button
              type="submit"
              style={{ width: '312px', marginTop: '15px', padding: '5px', fontSize: '16px', background: '#4CAF50', color: 'white' }}
            >
              Login
            </button>
          </form>
        </div>
      )}
      {userType && renderDashboard()}
    </div>
  );
};

export default Sign_up;
