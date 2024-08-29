import React from 'react';
import { Container, Grid, Box, Typography, TextField, Button, Radio, FormControlLabel, FormLabel, RadioGroup } from '@mui/material';
import { MobileFriendly } from '@mui/icons-material';

function BookingPage() {
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
            <form id="booking-page" method="post">
              <Box mb={2}>
                <TextField 
                  fullWidth 
                  label="Customer Names" 
                  variant="outlined" 
                  required 
                />
              </Box>
              <Box mb={2}>
                <TextField 
                  fullWidth 
                  label="Phone Number" 
                  variant="outlined" 
                  type="tel" 
                  required 
                />
              </Box>
              <Box mb={2}>
                <TextField 
                  fullWidth 
                  label="National ID/ Passport" 
                  variant="outlined" 
                  required 
                />
              </Box>
              <Box mb={2}>
                <TextField 
                  fullWidth 
                  label="Email" 
                  variant="outlined" 
                  type="email" 
                />
              </Box>
              <Box mb={2}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup row>
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="other" control={<Radio />} label="Others" />
                </RadioGroup>
              </Box>
              <Grid container justifyContent="flex-end">
                <Button type="submit" variant="outlined">Next</Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
export default BookingPage;