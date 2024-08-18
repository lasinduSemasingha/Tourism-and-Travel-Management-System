import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const ViewSubmissions = () => {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/contact');
                setSubmissions(response.data);
            } catch (error) {
                console.error('Error fetching contact submissions:', error);
            }
        };

        fetchSubmissions();
    }, []);

    return (
        <Container maxWidth="lg" style={{ marginTop: '3rem' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Contact Requests
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell>Message</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {submissions.map((submission) => (
                            <TableRow key={submission._id}>
                                <TableCell>{submission.name}</TableCell>
                                <TableCell>{submission.email}</TableCell>
                                <TableCell>{submission.subject}</TableCell>
                                <TableCell>{submission.message}</TableCell>
                                <TableCell>{new Date(submission.date).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default ViewSubmissions;
