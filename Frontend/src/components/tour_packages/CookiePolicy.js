import React from 'react';
import { Container, Typography, Grid, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

const CookiePolicy = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Paper style={{ padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h4" gutterBottom>
          Cookie Policy
        </Typography>
        <Typography variant="body1" paragraph>
          This Cookie Policy explains how Travel Sphere uses cookies and similar technologies on our website. By using our website, you consent to our use of cookies in accordance with this policy.
        </Typography>

        <Typography variant="h6" gutterBottom>
          What Are Cookies
        </Typography>
        <Typography variant="body1" paragraph>
          Cookies are small text files that are placed on your device when you visit our website. They help us understand how you interact with our website and improve your experience.
        </Typography>
        <Divider style={{ margin: '20px 0' }} />

        <Typography variant="h6" gutterBottom>
          How We Use Cookies
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Essential Cookies" secondary="These cookies are necessary for the website to function properly and enable you to navigate and use its features." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Performance Cookies" secondary="These cookies collect information about how visitors use our website, which helps us improve its performance." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Functionality Cookies" secondary="These cookies allow our website to remember choices you make and provide enhanced, more personal features." />
          </ListItem>
        </List>
        <Divider style={{ margin: '20px 0' }} />

        <Typography variant="h6" gutterBottom>
          Managing Cookies
        </Typography>
        <Typography variant="body1" paragraph>
          You can manage your cookie preferences through your browser settings. However, disabling cookies may affect the functionality of our website.
        </Typography>
        <Divider style={{ margin: '20px 0' }} />

        <Typography variant="h6" gutterBottom>
          Changes to Cookie Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update this Cookie Policy from time to time. Any changes will be posted on this page, and we encourage you to review it periodically.
        </Typography>
        <Divider style={{ margin: '20px 0' }} />

        <Typography variant="h6" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about our Cookie Policy, please contact us at contact@travelsphere.com.
        </Typography>
      </Paper>
    </Container>
  );
};

export default CookiePolicy;
