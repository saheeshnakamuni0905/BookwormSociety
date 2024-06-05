import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Box, TextField, Button, Container, CircularProgress } from '@mui/material';

function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: 'reader'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onRegister = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    const { confirmPassword, ...registrationData } = userData;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3002/user/create', registrationData);
      if (response.data) {
        alert(response.data.message || 'Registration successful. Please check your email to verify your account.');
        navigate('/login');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
      console.error("Error during registration:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
    setError('');
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 10,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)'
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Register
        </Typography>
        <form onSubmit={onRegister} noValidate>
          <TextField
            label="First Name"
            variant="outlined"
            name="firstName"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={userData.firstName}
            onChange={handleChange}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            name="lastName"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={userData.lastName}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={userData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={userData.password}
            onChange={handleChange}
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            name="confirmPassword"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={userData.confirmPassword}
            onChange={handleChange}
          />
          {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 1, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Register;
