import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { Home, ArrowDropDown } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { green } from '@mui/material/colors';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth(); // Access user from context
  const [anchorEl, setAnchorEl] = useState(null); // State for dropdown menu

  // Safely access user ID
  const userId = user ? user._id : null;

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Open menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close menu
  };

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
              <Button
                color="inherit"
                onClick={handleMenuClick}
                endIcon={<ArrowDropDown />}
              >
                Packages
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose} component={Link} to="/package-manager">Add New Package</MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/packages">View All Packages</MenuItem>
              </Menu>
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
