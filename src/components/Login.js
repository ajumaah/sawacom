import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import { SERVER_URL } from "../../config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent form submission
    setLoading(true); // Start loading
    try {
      const response = await fetch(`${SERVER_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Debug: Check what the backend is returning
        const { token, redirectUrl } = data;
  
        // Save the token in local storage and set it in the state
        localStorage.setItem("token", token);
        setToken(token);
  
        // Route the user based on the redirectUrl
        if (redirectUrl) {
          router.push(redirectUrl);
        } else {
          setError("Unknown redirect URL");
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("An error occurred while logging in.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ textAlign: "center", mb: 2 }}>
          <MobileFriendlyIcon style={{ fontSize: 80 }} />
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center", mb: 2 }}>
          <Typography variant="h4">LOGIN</Typography>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center", mb: 2 }}>
          <Typography variant="body1">
            Use your email and password to login
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleLogin}>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            {error && (
              <Typography color="error" align="center" mb={2}>
                {error}
              </Typography>
            )}
            <Grid container>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                style={{ backgroundColor: "#00bfa5" }}
                disabled={loading}
              >
                {loading ? "Logging in..." : "LOGIN"}
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;