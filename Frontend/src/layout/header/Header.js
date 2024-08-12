import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, IconButton } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { Home } from '@mui/icons-material';
import { green } from '@mui/material/colors';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth(); // Access user from context

  // Safely access user ID
  const userId = user ? user._id : null;

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1A385A' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Travel Sphere
          </Link>
        </Typography>
        <div style={{ flexGrow: 1 }}>
          <Button startIcon={<Home />} color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/about">About</Button>
          {isAuthenticated && (
            <>
              <Button color="inherit" component={Link} to="/destination">Destinations</Button>
              {userId && <Button color="inherit" component={Link} to={`/booked-tickets/${userId}`}>Bookings</Button>}
            </>
          )}
        </div>
        <div>
          {!isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/userlogin">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/profile">Profile</Button>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
