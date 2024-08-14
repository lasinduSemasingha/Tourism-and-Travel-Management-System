import React from 'react';
import { Container, Typography, Grid, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { PrivacyTip } from '@mui/icons-material';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Paper style={{ padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>
        
        <Typography variant="body1" paragraph>
          At Travel Sphere, we are committed to protecting your privacy and ensuring a safe online experience. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this policy carefully to understand our views and practices regarding your personal data and how we will treat it.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Information We Collect
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Personal Information" secondary="We may collect personal information such as your name, email address, and contact details when you register or interact with our services." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Usage Data" secondary="We collect information about your interactions with our website, including IP addresses, browser types, and browsing patterns." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Cookies" secondary="We use cookies to enhance your user experience. You can manage your cookie preferences through your browser settings." />
          </ListItem>
        </List>
        <Divider style={{ margin: '20px 0' }} />

        <Typography variant="h6" gutterBottom>
          How We Use Your Information
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="To Provide and Maintain Our Services" secondary="We use your information to operate and improve our website and services, and to provide customer support." />
          </ListItem>
          <ListItem>
            <ListItemText primary="To Communicate with You" secondary="We may use your contact details to send you updates, newsletters, and promotional materials." />
          </ListItem>
          <ListItem>
            <ListItemText primary="To Monitor and Analyze Usage" secondary="We use analytics tools to understand how users interact with our website and to enhance user experience." />
          </ListItem>
        </List>
        <Divider style={{ margin: '20px 0' }} />

        <Typography variant="h6" gutterBottom>
          Data Security
        </Typography>
        <Typography variant="body1" paragraph>
          We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee its absolute security.
        </Typography>
        <Divider style={{ margin: '20px 0' }} />

        <Typography variant="h6" gutterBottom>
          Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </Typography>
        <Divider style={{ margin: '20px 0' }} />

        <Typography variant="h6" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about this Privacy Policy, please contact us at contact@travelsphere.com.
        </Typography>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;
