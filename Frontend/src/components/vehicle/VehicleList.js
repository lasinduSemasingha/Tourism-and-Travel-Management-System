import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, IconButton, CircularProgress, TextField, Tabs, Tab, Box, InputAdornment } from '@mui/material';
import { Edit, Delete, Search } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vehicles');
        const vehiclesWithImages = await Promise.all(response.data.map(async (vehicle) => {
          if (vehicle.image) {
            const imageResponse = await axios.get(`http://localhost:5000/api/vehicles/image/${vehicle._id}`);
            return { ...vehicle, image: imageResponse.data.imgSrc };
          }
          return vehicle;
        }));
        setVehicles(vehiclesWithImages);
        setFilteredVehicles(vehiclesWithImages);
      } catch (err) {
        console.error("Error fetching vehicles:", err.response ? err.response.data : err.message);
        setError('Error fetching vehicles');
      }
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    setFilteredVehicles(
      vehicles.filter(vehicle =>
        vehicle.vehicleType.toLowerCase().includes(lowerCaseQuery) ||
        vehicle.registrationNumber.toLowerCase().includes(lowerCaseQuery) ||
        vehicle.rentalPrice.toString().includes(lowerCaseQuery) ||
        vehicle.status.toLowerCase().includes(lowerCaseQuery)
      )
    );
  }, [searchQuery, vehicles]);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:5000/api/vehicles/${id}`);
      setVehicles(vehicles.filter(vehicle => vehicle._id !== id));
      setFilteredVehicles(filteredVehicles.filter(vehicle => vehicle._id !== id));
    } catch (err) {
      console.error("Error deleting vehicle:", err.response ? err.response.data : err.message);
      setError('Error deleting vehicle');
    } finally {
      setDeletingId(null);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const generatePDFReport = async (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      console.error('Data is not a valid array or is empty');
      alert('No data available to generate the report');
      return;
    }
  
    const doc = new jsPDF();
    const images = [];
  
    // Add title
    doc.setFontSize(18);
    doc.text('Vehicle Report', 14, 22);
  
    // Add images and generate their data URLs
    for (const vehicle of data) {
      if (vehicle.image) {
        try {
          const image = await fetch(vehicle.image);
          const imageBlob = await image.blob();
          const imageUrl = URL.createObjectURL(imageBlob);
          images.push({ id: vehicle._id, url: imageUrl });
        } catch (error) {
          console.error(`Error fetching image for vehicle ${vehicle._id}:`, error);
        }
      }
    }
  
    // Define columns for the table
    const columns = ['Vehicle Type', 'Registration Number', 'Price', 'Status'];
    const rows = data.map(vehicle => [
      vehicle.vehicleType,
      vehicle.registrationNumber,
      `$${vehicle.rentalPrice}`,
      vehicle.status,
    ]);
  
    // Add a table with images
    doc.autoTable({
      startY: 30,
      head: [columns],
      body: rows,
      margin: { horizontal: 10 },
      didDrawCell: (data) => {
        if (data.column.index === 0 && images[data.row.index]) {
          // Insert image into the cell
          doc.addImage(images[data.row.index].url, 'JPEG', data.cell.x + 1, data.cell.y + 1, 30, 20);
        }
      }
    });
  
    // Save the PDF with a custom name
    doc.save('Vehicle_Report.pdf');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom style={{ marginBottom: '1rem' }}>
        All Vehicles
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/vehicle/add')}
        style={{ marginBottom: '1rem' }}
      >
        Add Vehicle
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
          <Tab label="Vehicle List" />
          <Tab label="Generate Report" />
        </Tabs>
        {tabValue === 1 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => generatePDFReport(filteredVehicles)} 
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
              <TableCell style={{ border: '1px solid #ddd' }}>Type</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>Registration</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>Price</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>Status</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVehicles.map(vehicle => (
              <TableRow key={vehicle._id}>
                <TableCell style={{ border: '1px solid #ddd' }}>
                  {vehicle.image ? (
                    <img
                      src={vehicle.image}
                      alt="Vehicle"
                      style={{ width: '100px', height: 'auto', objectFit: 'cover' }}
                    />
                  ) : 'No Image'}
                </TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>{vehicle.vehicleType}</TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>{vehicle.registrationNumber}</TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>${vehicle.rentalPrice}</TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>{vehicle.status}</TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    onClick={() => navigate(`/vehicle/update/${vehicle._id}`)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    aria-label="delete"
                    onClick={() => handleDelete(vehicle._id)}
                    disabled={deletingId === vehicle._id}
                  >
                    {deletingId === vehicle._id ? (
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

export default VehicleList;
