import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Tabs, Tab, Box, InputAdornment, Card, CardContent, Typography, Grid, IconButton, CircularProgress, Container } from '@mui/material';
import { Edit, Delete, Search } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const DestinationList = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/destinations');
        const destinationsWithImages = await Promise.all(response.data.map(async (destination) => {
          if (destination.image) {
            const imageResponse = await axios.get(`http://localhost:5000/api/destinations/image/${destination._id}`);
            return { ...destination, image: imageResponse.data.imgSrc };
          }
          return destination;
        }));
        setDestinations(destinationsWithImages);
        setFilteredDestinations(destinationsWithImages);
      } catch (err) {
        console.error("Error fetching destinations:", err.response ? err.response.data : err.message);
        setError('Error fetching destinations');
      }
    };

    fetchDestinations();
  }, []);

  useEffect(() => {
    setFilteredDestinations(
      destinations.filter(destination =>
        destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, destinations]);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:5000/api/destinations/${id}`);
      setDestinations(destinations.filter(destination => destination._id !== id));
      setFilteredDestinations(filteredDestinations.filter(destination => destination._id !== id));
    } catch (err) {
      console.error("Error deleting destination:", err.response ? err.response.data : err.message);
      setError('Error deleting destination');
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
    doc.text('Destination Report', 14, 22);

    // Add images and generate their data URLs
    for (const destination of data) {
      if (destination.image) {
        try {
          const image = await fetch(destination.image);
          const imageBlob = await image.blob();
          const imageUrl = URL.createObjectURL(imageBlob);
          images.push({ id: destination._id, url: imageUrl });
        } catch (error) {
          console.error(`Error fetching image for destination ${destination._id}:`, error);
        }
      }
    }

    // Define columns for the table
    const columns = ['Name', 'Location', 'Price', 'Description'];
    const rows = data.map(destination => [
      destination.name,
      destination.location,
      `$${destination.price}`,
      destination.description,
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
    doc.save('Destination_Report.pdf');
  };

  return (
    <Container maxWidth="lg" style={{ padding: '0 16px' }}>
      <Typography variant="h4" gutterBottom>
        All Destinations
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/destination/add')}
        style={{ marginBottom: '20px' }}
      >
        Add Destination
      </Button>

      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '20px', width: '100%' }}
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
          <Tab label="Destination List" />
          <Tab label="Generate Report" />
        </Tabs>
        {tabValue === 1 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => generatePDFReport(filteredDestinations)}
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
              <TableCell style={{ border: '1px solid #ddd' }}>Description</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDestinations.map(destination => (
              <TableRow key={destination._id}>
                <TableCell style={{ border: '1px solid #ddd' }}>
                  {destination.image ? (
                    <img
                      src={destination.image}
                      alt="Destination"
                      style={{ width: '100px', height: 'auto', objectFit: 'cover' }}
                    />
                  ) : 'No Image'}
                </TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>{destination.name}</TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>{destination.location}</TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>${destination.price}</TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>{destination.description}</TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    onClick={() => navigate(`/destination/update/${destination._id}`)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    aria-label="delete"
                    onClick={() => handleDelete(destination._id)}
                    disabled={deletingId === destination._id}
                  >
                    {deletingId === destination._id ? (
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
    </Container>
  );
};

export default DestinationList;
