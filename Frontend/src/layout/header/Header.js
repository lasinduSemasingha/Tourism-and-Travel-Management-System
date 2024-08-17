import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Menu, MenuItem } from '@mui/material';
import { Home, ArrowDropDown } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, user, isAdmin, isUser, adminLogout } = useAuth(); // Access isAdmin from context
  const [anchorEl, setAnchorEl] = useState(null); // State for dropdown menu

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Open menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close menu
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#1A385A' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Travel Sphere
          </Link>
        </Typography>
        <div style={{ flexGrow: 1 }}>
          <Button startIcon={<Home />} color="inherit" component={Link} to="/">Home</Button>
          <>
            {isAdmin && <Button color="inherit" component={Link} to={`/admin-dashboard`}>Dashboard</Button>}
          </>
          <Button color="inherit" component={Link} to="/aboutus">About</Button>
          {isAuthenticated && !isAdmin && ( // Hide these buttons if the user is an admin
            <>
              <Button color="inherit" component={Link} to={`/booked-tickets/${user?._id}`}>Bookings</Button>
              <Button color="inherit" component={Link} to="/destinationuser">Destinations</Button>
              <Button color="inherit" component={Link} to="/vehicleuser">Vehicles</Button>
              <Button color="inherit" component={Link} to="/hotellistuser">Hotels</Button>
              <Button
                color="inherit"
                onClick={handleMenuClick}
                endIcon={<ArrowDropDown />}
              >
                Reservations
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose} component={Link} to="/addedreservations">Destination Reservation</MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/addedvehiclereservations">Vehicle Reservation</MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/manage-restaurants-reservations">Restaurant Reservations</MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/addedhotelreservations">Hotel Reservation</MenuItem>
              </Menu>
            </>
          )}
        </div>
        <div>
          {!isAuthenticated ? (
            <>
            <Button
                color="inherit"
                onClick={handleMenuClick}
                endIcon={<ArrowDropDown />}
              >
                Login
              </Button>
              <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose} component={Link} to="/adminlogin">Admin</MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/userlogin">User</MenuItem>
              </Menu>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          ) : (
            <>
              {!isAdmin && <Button color="inherit" component={Link} to="/userprofile">Profile</Button>}
              {isUser && <Button color="inherit" onClick={logout}>Logout</Button>}
              {isAdmin && <Button color="inherit" onClick={adminLogout}>Logout</Button>}
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
