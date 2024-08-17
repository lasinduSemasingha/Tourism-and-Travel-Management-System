import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Button,
  Container,
  Grid,
  Box
} from '@mui/material';
import { Delete as DeleteIcon, GetApp as GetAppIcon } from '@mui/icons-material';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
        setFilteredUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users', err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    setFilteredUsers(users.filter(user =>
      user.name.toLowerCase().includes(lowercasedSearchTerm) ||
      user.email.toLowerCase().includes(lowercasedSearchTerm)
    ));
  }, [searchTerm, users]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      console.error('Error deleting user', err);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenerateReport = async () => {
  try {
    // Make a GET request to the backend endpoint for generating the report
    const response = await axios.get('http://localhost:5000/api/users/report', {
      responseType: 'blob' // Ensure the response is treated as a file
    });

    // Create a URL for the blob object
    const url = window.URL.createObjectURL(new Blob([response.data]));
    
    // Create a link element to download the file
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'users_report.csv'); // Name the file to be downloaded

    // Append the link to the document body and click it to start the download
    document.body.appendChild(link);
    link.click();
    
    // Clean up by removing the link and revoking the URL
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    console.log('Report generated and downloaded successfully.');
  } catch (error) {
    console.error('Error generating report:', error);
  }
};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          variant="outlined"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mr: 2, width: '300px' }}
        />
      </Box>
      {filteredUsers.length === 0 ? (
        <Typography>No users found.</Typography>
      ) : (
        filteredUsers.map((user) => (
          <Card key={user._id} sx={{ mb: 2, borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="body1">{user.email}</Typography>
              <Typography variant="body2">{user.address}</Typography>
              <Typography variant="body2">{user.country}</Typography>
              <Typography variant="body2">{user.gender}</Typography>
              <IconButton
                color="error"
                onClick={() => handleDelete(user._id)}
                sx={{ mt: 1 }}
              >
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default UserList;
