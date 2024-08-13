import React from 'react';
import { Container, Grid, Typography, IconButton, Link, List, ListItem, ListItemText } from '@mui/material';
import { GitHub, LinkedIn, Facebook, Twitter } from '@mui/icons-material';
import { green } from '@mui/material/colors';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#1A385A', color: 'white', padding: '1rem 0' }}>
      <Container>
        <Grid container spacing={40}>
          {/* Quick Links Section */}
          <Grid item xs={12} sm={3.9}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <List>
              <ListItem>
                <ListItemText>
                  <Link href="/" color="inherit" underline="hover">Home</Link>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Link href="/aboutus" color="inherit" underline="hover">About Us</Link>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Link href="/destination" color="inherit" underline="hover">Destinations</Link>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Link href="/contact" color="inherit" underline="hover">Contact Us</Link>
                </ListItemText>
              </ListItem>
            </List>
          </Grid>

          {/* Contact Us Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" gutterBottom>
              123 Travel Lane, Cityville, ST 12345
            </Typography>
            <Typography variant="body2" gutterBottom>
              Email: <Link href="mailto:info@travelsphere.com" color="inherit">info@travelsphere.com</Link>
            </Typography>
            <Typography variant="body2">
              Phone: (123) 456-7890
            </Typography>
          </Grid>

          {/* Legal Section */}
          <Grid item xs={12} sm={4}>
            <Typography style={{ marginLeft: '20px' }} variant="h6" gutterBottom>
              Legal
            </Typography>
            <List>
              <ListItem>
                <ListItemText>
                  <Link href="/privacy-policy" color="inherit" underline="hover">Privacy Policy</Link>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Link href="/terms-of-service" color="inherit" underline="hover">Terms of Service</Link>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Link href="/cookie-policy" color="inherit" underline="hover">Cookie Policy</Link>
                </ListItemText>
              </ListItem>
            </List>
          </Grid>
        </Grid>

        {/* Social Media Links */}
        <Grid container spacing={3} justifyContent="center" style={{ marginTop: '1rem' }}>
          <Grid item>
            <IconButton color="inherit" component={Link} href="https://github.com" target="_blank">
              <GitHub />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton color="inherit" component={Link} href="https://linkedin.com" target="_blank">
              <LinkedIn />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton color="inherit" component={Link} href="https://facebook.com" target="_blank">
              <Facebook />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton color="inherit" component={Link} href="https://twitter.com" target="_blank">
              <Twitter />
            </IconButton>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Typography variant="body2" align="center" style={{ marginTop: '1rem' }}>
          &copy; {new Date().getFullYear()} Travel Sphere. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
