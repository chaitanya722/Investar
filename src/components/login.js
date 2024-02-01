// src/components/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data for the login API call
    const apiData = {
      username: formData.username,
      password: formData.password,
    };

    try {
      // Make a POST request to the login API (replace with the actual login API endpoint)
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        console.log('Login successful!');
        // Optionally, you can redirect the user or perform other actions
      } else {
        console.error('Login failed:', await response.json());
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div style={{ marginTop: '10px', width: '300px', margin: 'auto' }}>
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '16px', textAlign: 'left' }}>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '5px', fontSize: '16px' }}
            />
          </label>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '16px', textAlign: 'left' }}>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '5px', fontSize: '16px' }}
            />
          </label>
          <button
            type="submit"
            style={{ margin: '10px', padding: '10px', fontSize: '16px', background: '#4CAF50', color: 'white' }}
          >
            Login
          </button>
        </form>
        <p>
        New user? <Link to="/signup">Sign Up</Link>
      </p>
      </div>
    </div>
  );
};

export default Login;
