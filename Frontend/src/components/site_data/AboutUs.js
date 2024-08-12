import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Divider, Box, IconButton } from '@mui/material';
import { FlightTakeoff, Business, Info, Mail, Phone } from '@mui/icons-material';

const AboutUsPage = () => {
    return (
        <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
            <Typography variant="h2" gutterBottom align="center">
                About Us
            </Typography>

            <Card style={{ marginBottom: '2rem' }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        <Info color="primary" /> Our Mission
                    </Typography>
                    <Typography variant="body1">
                        At Travel Sphere, we are dedicated to making your travel experiences unforgettable. Our mission is to provide seamless and personalized travel solutions that cater to your unique preferences and needs. Whether you are looking for adventure, relaxation, or cultural exploration, we have something for everyone.
                    </Typography>
                </CardContent>
            </Card>

            <Card style={{ marginBottom: '2rem' }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        <Business color="primary" /> Our Team
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Jane Doe</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Founder & CEO
                                    </Typography>
                                    <Typography variant="body1" paragraph>
                                        Jane is the visionary behind Travel Sphere. With a passion for travel and a background in business management, she leads our team with dedication and innovation.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">John Smith</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Head of Operations
                                    </Typography>
                                    <Typography variant="body1" paragraph>
                                        John ensures that our operations run smoothly. His expertise in logistics and customer service helps us deliver exceptional travel experiences to our clients.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Emily Johnson</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Marketing Specialist
                                    </Typography>
                                    <Typography variant="body1" paragraph>
                                        Emily is responsible for spreading the word about Travel Sphere. Her creative marketing strategies help us reach and connect with travel enthusiasts around the world.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        <Mail color="primary" /> Contact Us
                    </Typography>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Typography variant="body1" paragraph>
                            Have questions or need assistance? Reach out to us through the following channels:
                        </Typography>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Typography variant="body1">
                                <Phone /> +1-800-123-4567
                            </Typography>
                            <Typography variant="body1">
                                <Mail /> support@travelsphere.com
                            </Typography>
                            <Typography variant="body1">
                                123 Travel Lane, Suite 100, Adventure City, AC 12345
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default AboutUsPage;
