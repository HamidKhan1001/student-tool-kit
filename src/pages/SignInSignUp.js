import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/SignInSignUp.css';

const SignInSignUp = ({ setUser }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const apiUrlRootPath = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsSignUp((prev) => !prev);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
     
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      try {
        const response = await axios.post(`${apiUrlRootPath}/users/signup`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setMessage(response.data.message);
        setUser(response.data.user); 
        setError('');
        navigate('/dashboard'); 
      } catch (error) {
        setError(error.response ? error.response.data.error : 'Sign-up failed. Please try again.');
      }

    } else {
      try {
        const response = await axios.post(`${apiUrlRootPath}/users/signin`, {
          email: formData.email,
          password: formData.password,
        }, {
          withCredentials: true
      });
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setMessage(response.data.message);
        
        setUser(response.data.user); 
        setError('');
        navigate('/dashboard'); 
      } catch (error) {
        setError(error.response ? error.response.data.error : 'Invalid email or password.');
      }
    }
  };

  return (
    <div className="fullscreen-container">
      <div className="form-container">
        <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          {isSignUp && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
          )}
          <button type="submit" className="form-btn">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <p>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span className="toggle-link" onClick={toggleMode}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignInSignUp;
