import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, IconButton } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import { Home } from '@mui/icons-material';
import { green } from '@mui/material/colors';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <AppBar position="static" sx={{ backgroundColor: green[900] }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
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
              <Button color="inherit" component={Link} to="/booked-tickets">Bookings</Button>
            </>
          )}
            {!isAuthenticated ? (
              <>
                
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/destinationuser">Destinations</Button>
                <Button color="inherit" component={Link} to="/addedreservations">Reservations</Button>
                <Button color="inherit" component={Link} to="/booked-tickets">Bookings</Button>
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
