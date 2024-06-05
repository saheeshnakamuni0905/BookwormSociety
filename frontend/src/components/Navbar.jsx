import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { useSelector, useDispatch } from 'react-redux'; 
import { logoutAction } from '../redux/action'; 
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

function Navbar() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();  // Hook to access the current route
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("token");
    navigate('/login');
  };

  // Function to determine if the Home button should be shown
  const showHomeButton = () => {
    const path = location.pathname;
    // List of paths where the Home button should not be displayed
    const hideOnRoutes = ['/admin', '/add-book','/authorlanding'];
    return !hideOnRoutes.includes(path);
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          BookWorm
        </Typography>
        {showHomeButton() && <Button color="inherit" component={Link} to="/home">Home</Button>}
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
