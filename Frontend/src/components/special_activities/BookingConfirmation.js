import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import QRCode from 'qrcode';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Download as DownloadIcon } from '@mui/icons-material';

const BookingConfirmation = () => {
  const { id } = useParams(); // Use id from URL
  const [activity, setActivity] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState(null); // State for QR code URL
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/special/${id}`);
        setActivity(response.data);

        // Generate QR code URL
        const qrCodeData = `Activity: ${response.data.activityName}, Date: ${response.data.date}, Location: ${response.data.activityLocation}, Price: ${response.data.price}`;
        const qrCodeUrl = await QRCode.toDataURL(qrCodeData);
        setQrCodeUrl(qrCodeUrl);

      } catch (err) {
        setError('Error fetching activity');
      }
    };

    fetchActivity();
  }, [id]);

  const handleDownload = async () => {
    if (!activity || !qrCodeUrl) return;

    // Create PDF document
    const doc = new jsPDF();
    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const centerX = pageWidth / 2;
    const lineHeight = 10;

    // Add border around the page
    doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);

    // Add title with larger font size and bold text
    doc.setFontSize(22); // Larger font size for the title
    doc.setFont('helvetica', 'bold'); // Set font to bold
    doc.text('Booking Confirmation', centerX, margin + lineHeight, { align: 'center' });

    // Reset font to normal for other text
    doc.setFontSize(12); // Normal font size
    doc.setFont('helvetica', 'normal'); // Set font to normal

    // Add other text centered
    doc.text(`Activity: ${activity.activityName}`, centerX, margin + lineHeight * 2, { align: 'center' });
    doc.text(`Date: ${activity.date}`, centerX, margin + lineHeight * 3, { align: 'center' });
    doc.text(`Location: ${activity.activityLocation}`, centerX, margin + lineHeight * 4, { align: 'center' });
    doc.text(`Price: ${activity.price}`, centerX, margin + lineHeight * 5, { align: 'center' });

    // Add QR code image to PDF
    doc.addImage(qrCodeUrl, 'PNG', centerX - 20, margin + lineHeight * 6, 40, 40);

    // Save the PDF
    doc.save('booking-confirmation.pdf');
  };

  if (!activity) return <Typography variant="h6" align="center">Loading booking...</Typography>;

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={8}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h4" gutterBottom align="center">
                Booking Confirmation
              </Typography>
              <Typography variant="h6" align="center">
                Activity: {activity.activityName}
              </Typography>
              <Typography variant="body1" align="center">
                Date: {activity.date}
              </Typography>
              <Typography variant="body1" align="center">
                Location: {activity.activityLocation}
              </Typography>
              <Typography variant="body1" align="center">
                Price: {activity.price}
              </Typography>
              {qrCodeUrl && (
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                  <img src={qrCodeUrl} alt="QR Code" />
                </div>
              )}
              <Button
                variant="contained"
                color="primary"
                startIcon={<DownloadIcon />}
                fullWidth
                onClick={handleDownload}
              >
                Download Confirmation
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookingConfirmation;
