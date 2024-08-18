import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, IconButton, CircularProgress, TextField, Tabs, Tab, Box, InputAdornment, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Edit, Delete, Search } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const statusOptions = [
  { value: 'in-stock', label: 'In Stock' },
  { value: 'out-of-stock', label: 'Out of Stock' },
];

const TravelItemList = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [statusUpdatingId, setStatusUpdatingId] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/travelitem');
        setItems(response.data);
        setFilteredItems(response.data);
      } catch (err) {
        console.error("Error fetching items:", err.response ? err.response.data : err.message);
        setError('Error fetching items');
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    setFilteredItems(
      items.filter(item => {
        const nameMatch = item.itemName ? item.itemName.toLowerCase().includes(lowerCaseQuery) : false;
        const priceMatch = item.price ? item.price.toString().includes(lowerCaseQuery) : false;
        const availabilityMatch = item.availability ? item.availability.toLowerCase().includes(lowerCaseQuery) : false;
        const categoryMatch = item.category ? item.category.toLowerCase().includes(lowerCaseQuery) : false;

        return nameMatch || priceMatch || availabilityMatch || categoryMatch;
      })
    );
  }, [searchQuery, items]);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:5000/api/travelitem/${id}`);
      setItems(items.filter(item => item._id !== id));
      setFilteredItems(filteredItems.filter(item => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err.response ? err.response.data : err.message);
      setError('Error deleting item');
    } finally {
      setDeletingId(null);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleStatusChange = async (id, newStatus) => {
    console.log(`Updating status for item ID ${id} to ${newStatus}`);
    setStatusUpdatingId(id);

    try {
      const response = await axios.put(`http://localhost:5000/api/travelitem/update/${id}`, { status: newStatus });
      console.log('Response:', response.data);

      setItems(prevItems => 
        prevItems.map(item => 
          item._id === id ? { ...item, status: newStatus } : item
        )
      );

      setFilteredItems(prevFilteredItems => 
        prevFilteredItems.map(item => 
          item._id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (err) {
      console.error("Error updating item status:", err.response ? err.response.data : err.message);
      setError('Error updating item status');
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
    doc.text('Travel Item Report', 14, 22);

    // Define columns for the table
    const columns = ['Name', 'Price', 'Category', 'Status'];
    const rows = data.map(item => [
      item.itemName || 'N/A', // Ensure itemName is displayed correctly
      `$${item.price || '0'}`, // Ensure price is displayed correctly
      item.category || 'N/A', // Ensure category is displayed correctly
      item.status || 'N/A', // Ensure status is displayed correctly
    ]);

    // Add a table
    doc.autoTable({
      startY: 30,
      head: [columns],
      body: rows,
      margin: { horizontal: 10 }
    });

    // Save the PDF with a custom name
    doc.save('Travel_Item_Report.pdf');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom style={{ marginBottom: '1rem' }}>
        All Travel Items
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/addtravelitem')}
        style={{ marginBottom: '1rem' }}
      >
        Add Travel Item
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
          <Tab label="Item List" />
          <Tab label="Generate Report" />
        </Tabs>
        {tabValue === 1 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => generatePDFReport(filteredItems)}
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
              <TableCell style={{ border: '1px solid #ddd' }}>Price</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>Category</TableCell>
              <TableCell style={{ border: '1px solid #ddd', width: '100px' }}>Status</TableCell> {/* Reduced width for Actions */}
              <TableCell style={{ border: '1px solid #ddd', width: '120px' }}>Actions</TableCell> {/* Reduced width for Actions */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map(item => (
              <TableRow key={item._id}>
                <TableCell style={{ border: '1px solid #ddd' }}>
                  {item.image ? (
                    <img
                      src={`http://localhost:5000/api/items/image/${item._id}`} // Ensure correct URL for images
                      alt="Item"
                      style={{ width: '100px', height: 'auto', objectFit: 'cover' }}
                    />
                  ) : 'No Image'}
                </TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>{item.itemName || 'N/A'}</TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>${item.price || '0'}</TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>{item.category || 'N/A'}</TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={statusUpdatingId === item._id ? statusUpdate[item._id] || item.status : item.status}
                      onChange={(e) => {
                        setStatusUpdate(prev => ({ ...prev, [item._id]: e.target.value }));
                        handleStatusChange(item._id, e.target.value);
                      }}
                      label="Status"
                      disabled={statusUpdatingId === item._id}
                    >
                      {statusOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell style={{ border: '1px solid #ddd', width: '120px' }}>
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    onClick={() => navigate(`/travelitemupdate/${item._id}`)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    aria-label="delete"
                    onClick={() => handleDelete(item._id)}
                    disabled={deletingId === item._id}
                  >
                    {deletingId === item._id ? (
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

export default TravelItemList;
