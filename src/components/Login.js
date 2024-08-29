import React from 'react';
import { Container, Grid, TextField, Button, Typography, Box } from '@mui/material';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';

function Login() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ textAlign: 'center', mb: 2 }}>
          <MobileFriendlyIcon style={{ fontSize: 80 }} />
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h4">LOGIN</Typography>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="body1">Use your email and password to login</Typography>
        </Grid>
        <Grid item xs={12}>
          <form action="/dist/pages/home.html" method="get">
            <Box mb={2}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                required
              />
            </Box>
            <Grid container justifyContent="flex-end">
              <Button type="submit" variant="outlined">
                LOGIN
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
export default Login;