import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Menu, MenuItem, IconButton, Badge } from '@mui/material';
import { Home, ArrowDropDown, Notifications } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const Navbar = () => {
  const { isAuthenticated, logout, user, isAdmin, isUser, adminLogout, isOwner, ownerLogout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate(); // Hook for programmatic navigation

  useEffect(() => {
    if (isAuthenticated && isUser) {
      const fetchNotifications = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/notifications');
          setNotifications(response.data);
          setUnreadCount(response.data.filter(notif => !notif.read).length);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };
      fetchNotifications();
    }
  }, [isAuthenticated, isUser]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleNotificationItemClick = async (id, read) => {
    try {
      if (!read) {
        await axios.patch(`http://localhost:5000/api/notifications/${id}/read`);
        setNotifications(notifications.map(notif =>
          notif._id === id ? { ...notif, read: true } : notif
        ));
        setUnreadCount(unreadCount - 1);
      }
      navigate(`/notification/${id}`);
      handleNotificationClose();
    } catch (error) {
      console.error('Error handling notification click:', error);
    }
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
            {isAdmin && !isOwner && <Button color="inherit" component={Link} to={`/admin-dashboard`}>Dashboard</Button>}
            {!isAdmin && isOwner && <Button color="inherit" component={Link} to={`/owner/dashboard`}>Dashboard</Button>}
          </>
          <Button color="inherit" component={Link} to="/aboutus">About</Button>
          {isAuthenticated && !isAdmin && !isOwner && (
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
                <MenuItem onClick={handleMenuClose} component={Link} to="/addeditemreservation">Purchased Items</MenuItem>
              </Menu>
            </>
          )}
        </div>
        <div>
          {isAuthenticated && isUser && (
            <>
              <IconButton
                color="inherit"
                onClick={handleNotificationClick}
              >
                <Badge badgeContent={unreadCount} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
              <Menu
                anchorEl={notificationAnchorEl}
                open={Boolean(notificationAnchorEl)}
                onClose={handleNotificationClose}
              >
                {notifications.map(notif => (
                  <MenuItem
                    key={notif._id}
                    onClick={(event) => {
                      event.stopPropagation(); // Prevents the click event from propagating to the parent Menu
                      handleNotificationItemClick(notif._id, notif.read);
                    }}
                    style={{ color: notif.read ? 'blue' : 'red' }}
                  >
                    <div>
                      <Typography variant="body2">{notif.title}</Typography>
                      <Typography variant="caption">{notif.message}</Typography>
                      <Button
                        size="small"
                        color="primary"
                        onClick={(event) => {
                          event.stopPropagation(); // Prevents the click event from propagating to the parent Menu
                          handleNotificationItemClick(notif._id, notif.read);
                        }}
                        style={{ marginLeft: 'auto' }}
                      >
                        Read
                      </Button>
                    </div>
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
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
                <MenuItem onClick={handleMenuClose} component={Link} to="/hotelownerlogin">Hotel Owner</MenuItem>
              </Menu>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          ) : (
            <>
              {!isAdmin && !isOwner && <Button color="inherit" component={Link} to="/userprofile">Profile</Button>}
              {isUser && <Button color="inherit" onClick={logout}>Logout</Button>}
              {isAdmin && !isUser && <Button color="inherit" onClick={adminLogout}>Logout</Button>}
              {isOwner && !isAdmin && <Button color="inherit" onClick={ownerLogout}>Logout</Button>}
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
