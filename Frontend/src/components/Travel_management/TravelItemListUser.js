import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Tabs,
  Tab,
  Box,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import axios from 'axios';

const TravelItemListUser = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [buyingId, setBuyingId] = useState(null);
  const [quantity, setQuantity] = useState(''); // Manage quantity input state

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/travelitem');
        const itemsWithImages = await Promise.all(
          response.data.map(async (item) => {
            if (item.image && item._id) {
              try {
                const imageResponse = await axios.get(
                  `http://localhost:5000/api/travelitem/image/${item._id}`
                );
                return { ...item, image: imageResponse.data.imgSrc };
              } catch (err) {
                console.error(`Error fetching image for item ${item._id}:`, err.response ? err.response.data : err.message);
                return { ...item, image: 'default-image-url' }; // Replace with your default image URL
              }
            }
            return item;
          })
        );
        setItems(itemsWithImages);
        setFilteredItems(itemsWithImages);
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
        const descriptionMatch = item.description ? item.description.toLowerCase().includes(lowerCaseQuery) : false;
        const priceMatch = item.price ? item.price.toString().includes(lowerCaseQuery) : false;
        const categoryMatch = item.category ? item.category.toLowerCase().includes(lowerCaseQuery) : false;

        return nameMatch || descriptionMatch || priceMatch || categoryMatch;
      })
    );
  }, [searchQuery, items]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleBuyNow = async (itemId) => {
    try {
      setBuyingId(itemId);
      const quantityValue = parseInt(quantity, 10); // Parse quantity input as an integer

      if (isNaN(quantityValue) || quantityValue <= 0) {
        alert('Please enter a valid quantity.');
        setBuyingId(null);
        return;
      }

      const userId = JSON.parse(localStorage.getItem('userInfo'))._id; // Retrieve userId from localStorage

      const response = await axios.post('http://localhost:5000/api/travelitemreservation/add', {
        cart: [{
          _id: itemId,
          quantity: quantityValue,
          userId: userId, // Use the retrieved user ID
        }]
      });

      console.log('Reservation successful:', response.data);
      // Handle any UI updates, such as clearing the cart or showing a confirmation message
      setQuantity(''); // Clear quantity input after successful reservation
    } catch (err) {
      console.error('Error creating reservation:', err.response ? err.response.data : err.message);
    } finally {
      setBuyingId(null);
    }
  };

  const categories = [...new Set(items.map(item => item.category))];

  const categoryItems = categories.reduce((acc, category) => {
    acc[category] = filteredItems.filter(item => item.category === category);
    return acc;
  }, {});

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom style={{ marginBottom: '1rem' }}>
        Travel Items
      </Typography>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <Box mb={2}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="category tabs">
          {categories.map((category, index) => (
            <Tab key={index} label={category} />
          ))}
        </Tabs>
      </Box>

      {error && <Typography color="error">{error}</Typography>}

      {categories.map((category, index) => (
        <div role="tabpanel" hidden={tabValue !== index} key={index} style={{ marginTop: '1rem' }}>
          {tabValue === index && (
            <Grid container spacing={3}>
              {categoryItems[category]?.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item._id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {item.itemName}
                      </Typography>
                      <img
                        src={item.image}
                        alt={item.itemName}
                        style={{ width: '100%', height: 'auto', marginBottom: '1rem' }}
                      />
                      <Typography variant="body1" gutterBottom>
                        Description: {item.description}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Price: ${item.price}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Stock: {item.stockAmount}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Category: {item.category}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Status: {item.status}
                      </Typography>
                      <div style={{ marginTop: '1rem' }}>
                        <TextField
                          label="Quantity"
                          type="number"
                          value={quantity}
                          onChange={handleQuantityChange}
                          InputProps={{
                            inputProps: { min: 1 }
                          }}
                        />
                        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleBuyNow(item._id)}
                            disabled={buyingId === item._id}
                          >
                            {buyingId === item._id ? (
                              <CircularProgress size={24} />
                            ) : (
                              'Buy Now'
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      ))}
    </div>
  );
};

export default TravelItemListUser;
