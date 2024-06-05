import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginAction } from '../redux/action';
import { Typography, Box, TextField, Button, Container, Grid, IconButton, InputAdornment } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/user/login', { email, password });
      if (response.data) {
        localStorage.setItem('token', response.data.token);
        dispatch(loginAction({
          email: response.data.email,
          role: response.data.type,
          token: response.data.token,
          userId: response.data.userId
        }));
        
        if (response.data.type === 'admin') {
          navigate('/admin');
      } else if (response.data.type === 'author') {
          navigate('/authorlanding'); 
      } else {
          navigate('/home');  
      }
      } else {
        alert(response.data.message || 'Failed to login');
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert('Login failed. Please try again.');
    }
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
          Login
        </Typography>
        <form onSubmit={onLogin} noValidate>
          <TextField 
            label="Email" 
            variant="outlined" 
            name="email"
            type="email"
            fullWidth 
            required 
            sx={{ mb: 2 }} 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <TextField 
            label="Password" 
            variant="outlined" 
            type={showPassword ? 'text' : 'password'}
            name="password"
            fullWidth 
            required 
            sx={{ mb: 2 }} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            sx={{ mt: 1, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Typography variant="body2">
                  {"Don't have an account? Register Now"}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
