import React, { useState } from 'react';
import { Container, Grid, Box, Typography, TextField, Button, FormLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@mui/material';
import { MobileFriendly } from '@mui/icons-material';
import jsPDF from 'jspdf';
import { SERVER_URL } from '../../config';

function BookingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    email: '',
    phoneModel: '',
    phoneMake: '',
    imei: '',
    phoneIssues: '',
  });
  const [open, setOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleNext = () => {
    setStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${backendUrl}/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const text = await response.text();

      if (response.ok) {
        const result = JSON.parse(text);
        generatePDF();
        setDialogMessage(`Success! \n
         `);
        setOpen(true);
      } else {
        setDialogMessage('Booking failed. Please try again.');
        setOpen(true);
      }
    } catch (error) {
      setDialogMessage('An error occurred while submitting your booking.');
      setOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text('Sawacom Phone Booking', 10, 10);
    doc.text(`Name: ${formData.customerName}`, 10, 20);
    doc.text(`Phone Number: ${formData.phoneNumber}`, 10, 30);
    doc.text(`Email: ${formData.email}`, 10, 40);
    doc.text(`Phone Make: ${formData.phoneMake}`, 10, 50);
    doc.text(`Phone Model: ${formData.phoneModel}`, 10, 60);
    doc.text(`IMEI: ${formData.imei}`, 10, 70);
    doc.text(`Phone Issues: ${formData.phoneIssues}`, 10, 80);

    doc.save('booking-details.pdf');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Box mb={2}>
              <TextField 
                fullWidth 
                label="Customer Name" 
                variant="outlined" 
                required 
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
              />
            </Box>
            <Box mb={2}>
              <TextField 
                fullWidth 
                label="Phone Number" 
                variant="outlined" 
                type="tel" 
                required 
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </Box>
            <Box mb={2}>
              <TextField 
                fullWidth 
                label="Email" 
                variant="outlined" 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Box>
          </>
        );
      case 2:
        return (
          <>
           <Box mb={2}>
              <TextField 
                fullWidth 
                label="Phone Make" 
                variant="outlined" 
                required 
                name="phoneMake"
                value={formData.phoneMake}
                onChange={handleChange}
              />
            </Box>
            <Box mb={2}>
              <TextField 
                fullWidth 
                label="Phone Model" 
                variant="outlined" 
                required 
                name="phoneModel"
                value={formData.phoneModel}
                onChange={handleChange}
              />
            </Box>
            <Box mb={2}>
              <TextField 
                fullWidth 
                label="IMEI" 
                variant="outlined" 
                name="imei"
                value={formData.imei}
                onChange={handleChange}
              />
            </Box>
          </>
        );
      case 3:
        return (
          <>
            <Box mb={2}>
              <FormLabel component="legend">Phone Issues</FormLabel>
              <TextField 
                fullWidth 
                label="Write the problem description here" 
                variant="outlined" 
                name="phoneIssues"
                value={formData.phoneIssues}
                onChange={handleChange}
              />
            </Box>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, border: '1px solid #ccc', borderRadius: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} textAlign="center">
            <MobileFriendly fontSize="large" />
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h5">Sawacom Phone Booking</Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography variant="body2">
              Fill all the fields marked <em style={{ color: 'red' }}>*</em>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <form id="booking-page" onSubmit={handleSubmit}>
              {renderStep()}
              <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
                {step > 1 && (
                  <Button variant="outlined" onClick={handleBack}>
                    Back
                  </Button>
                )}
                {step < 3 && (
                  <Button variant="outlined" onClick={handleNext}>
                    Next
                  </Button>
                )}
                {step === 3 && (
                  <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24} /> : 'Submit'}
                  </Button>
                )}
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Booking Status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default BookingPage;