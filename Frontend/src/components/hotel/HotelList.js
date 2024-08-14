import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, IconButton, CircularProgress, TextField, Tabs, Tab, Box, InputAdornment, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Edit, Delete, Search } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const statusOptions = [
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'pending', label: 'Pending' }
];

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [statusUpdatingId, setStatusUpdatingId] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hotels');
        setHotels(response.data);
        setFilteredHotels(response.data);
      } catch (err) {
        console.error("Error fetching hotels:", err.response ? err.response.data : err.message);
        setError('Error fetching hotels');
      }
    };

    fetchHotels();
  }, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    setFilteredHotels(
      hotels.filter(hotel => {
        const nameMatch = hotel.name ? hotel.name.toLowerCase().includes(lowerCaseQuery) : false;
        const locationMatch = hotel.location ? hotel.location.toLowerCase().includes(lowerCaseQuery) : false;
        const priceMatch = hotel.price ? hotel.price.toString().includes(lowerCaseQuery) : false;
        const statusMatch = hotel.approvalStatus ? hotel.approvalStatus.toLowerCase().includes(lowerCaseQuery) : false;

        return nameMatch || locationMatch || priceMatch || statusMatch;
      })
    );
  }, [searchQuery, hotels]);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:5000/api/hotels/delete/${id}`);
      setHotels(hotels.filter(hotel => hotel._id !== id));
      setFilteredHotels(filteredHotels.filter(hotel => hotel._id !== id));
    } catch (err) {
      console.error("Error deleting hotel:", err.response ? err.response.data : err.message);
      setError('Error deleting hotel');
    } finally {
      setDeletingId(null);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleStatusChange = async (id, newStatus) => {
    console.log(`Updating status for hotel ID ${id} to ${newStatus}`);
    setStatusUpdatingId(id);
  
    try {
      const response = await axios.put(`http://localhost:5000/api/hotels/update/${id}`, { approvalStatus: newStatus });
      console.log('Response:', response.data);
  
      setHotels(prevHotels => 
        prevHotels.map(hotel => 
          hotel._id === id ? { ...hotel, approvalStatus: newStatus } : hotel
        )
      );
  
      setFilteredHotels(prevFilteredHotels => 
        prevFilteredHotels.map(hotel => 
          hotel._id === id ? { ...hotel, approvalStatus: newStatus } : hotel
        )
      );
    } catch (err) {
      console.error("Error updating hotel status:", err.response ? err.response.data : err.message);
      setError('Error updating hotel status');
    } finally {
      setStatusUpdatingId(null);
    }
  };

  const generatePDFReport = async (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      console.error('Data is not a valid array or is empty');
      alert('No data available to generate the report');
      return;
    }

    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text('Hotel Report', 14, 22);

    // Define columns for the table
    const columns = ['Name', 'Location', 'Price', 'Status'];
    const rows = data.map(hotel => [
      hotel.name || 'N/A', // Ensure name is displayed correctly
      hotel.location || 'N/A', // Ensure location is displayed correctly
      `$${hotel.price || '0'}`, // Ensure price is displayed correctly
      hotel.approvalStatus || 'N/A', // Ensure status is displayed correctly
    ]);

    // Add a table
    doc.autoTable({
      startY: 30,
      head: [columns],
      body: rows,
      margin: { horizontal: 10 }
    });

    // Save the PDF with a custom name
    doc.save('Hotel_Report.pdf');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom style={{ marginBottom: '1rem' }}>
        All Hotels
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/hotel/add')}
        style={{ marginBottom: '1rem' }}
      >
        Add Hotel
      </Button>

      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '1rem', width: '100%' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      <Box mb={2}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="tabs"
        >
          <Tab label="Hotel List" />
          <Tab label="Generate Report" />
        </Tabs>
        {tabValue === 1 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => generatePDFReport(filteredHotels)}
            style={{ marginTop: '1rem' }}
          >
            Generate Report
          </Button>
        )}
      </Box>

      {error && <Typography color="error">{error}</Typography>}

      <TableContainer component={Paper} style={{ border: '1px solid #ddd' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ border: '1px solid #ddd' }}>Image</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>Name</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>Location</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>Price</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>Status</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredHotels.map(hotel => (
              <TableRow key={hotel._id}>
                <TableCell style={{ border: '1px solid #ddd' }}>
                  {hotel.image ? (
                    <img
                      src={`http://localhost:5000/api/hotels/image/${hotel._id}`} // Ensure correct URL for images
                      alt="Hotel"
                      style={{ width: '100px', height: 'auto', objectFit: 'cover' }}
                    />
                  ) : 'No Image'}
                </TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>{hotel.name || 'N/A'}</TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>{hotel.location || 'N/A'}</TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>${hotel.price || '0'}</TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={statusUpdatingId === hotel._id ? statusUpdate[hotel._id] || hotel.approvalStatus : hotel.approvalStatus}
                      onChange={(e) => {
                        setStatusUpdate(prev => ({ ...prev, [hotel._id]: e.target.value }));
                        handleStatusChange(hotel._id, e.target.value);
                      }}
                      label="Status"
                      disabled={statusUpdatingId === hotel._id}
                    >
                      {statusOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    onClick={() => navigate(`/hotelupdate/${hotel._id}`)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    aria-label="delete"
                    onClick={() => handleDelete(hotel._id)}
                    disabled={deletingId === hotel._id}
                  >
                    {deletingId === hotel._id ? (
                      <CircularProgress size={24} />
                    ) : (
                      <Delete />
                    )}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HotelList;
