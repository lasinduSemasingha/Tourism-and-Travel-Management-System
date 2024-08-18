import React from 'react';
import { Container, Typography, Grid, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Description } from '@mui/icons-material';

const TermsOfService = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Paper style={{ padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h4" gutterBottom>
          Terms of Service
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to Travel Sphere. These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          User Responsibilities
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Compliance" secondary="You agree to comply with all applicable laws and regulations while using our services." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Account Security" secondary="You are responsible for maintaining the confidentiality of your account and password." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Prohibited Activities" secondary="You agree not to engage in any activities that may harm our services or other users." />
          </ListItem>
        </List>
        <Divider style={{ margin: '20px 0' }} />

        <Typography variant="h6" gutterBottom>
          Intellectual Property
        </Typography>
        <Typography variant="body1" paragraph>
          All content and materials provided through our services are owned by [Your Company Name] or its licensors. You may not use, reproduce, or distribute any content without our prior written consent.
        </Typography>
        <Divider style={{ margin: '20px 0' }} />

        <Typography variant="h6" gutterBottom>
          Limitation of Liability
        </Typography>
        <Typography variant="body1" paragraph>
          Our liability is limited to the maximum extent permitted by law. We are not liable for any indirect, incidental, or consequential damages arising from your use of our services.
        </Typography>
        <Divider style={{ margin: '20px 0' }} />

        <Typography variant="h6" gutterBottom>
          Changes to Terms
        </Typography>
        <Typography variant="body1" paragraph>
          We may update these Terms from time to time. We will notify you of any changes by posting the new Terms on this page.
        </Typography>
        <Divider style={{ margin: '20px 0' }} />

        <Typography variant="h6" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about these Terms, please contact us at contact@travelsphere.com.
        </Typography>
      </Paper>
    </Container>
  );
};

export default TermsOfService;
