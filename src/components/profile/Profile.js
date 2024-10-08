import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Box,
  Skeleton,
  FormControl, // Import Skeleton
} from "@mui/material";
// import { SERVER_URL } from "../../../config";

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading
  const [responseMessage, setResponseMessage] = useState(""); // State for response message
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    userType: "User",
    repairCenter: "",
  });
  const [isFetching, setIsFetching] = useState(true); // State for checking if fetching is in progress
  const repairCenters = ["Oppo service Center","Samsung Repair Center", "Nokia Repair Center", "Neon Repair Center", "Vivo Repair Center", "Tecno RepairCenter"]; // Sample repair centers
 
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${backendUrl}/users`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsFetching(false); // Stop fetching
      }
    };

    fetchUsers();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewUser({ name: "", email: "", userType: "" });
  };

  const handleCreateUser = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`${backendUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        // Attempt to parse error message if response is not ok
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: "Network response was not ok" };
        }
        throw new Error(
          `${response.status}: ${errorData.message || "Failed to create user"}`
        );
      }

      const result = await response.json();
      setUsers([...users, result[0]]);
      setResponseMessage("User created successfully!"); // Set success message
      handleClose();
    } catch (error) {
      console.error("Error creating user:", error);
      setResponseMessage(`Error: ${error.message}`); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleResponseClose = () => {
    setResponseMessage("");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Profiles
      </Typography>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Create User
      </Button>
      <Grid container spacing={2} marginTop={2}>
        {isFetching
          ? // Render Skeletons while data is being fetched
            Array.from(new Array(6)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Skeleton variant="text" width={120} height={30} />
                    <Skeleton variant="text" width={80} height={20} />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : // Render users when data is fetched
            users.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user?.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{user?.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {user?.email}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
          <InputLabel>User Type</InputLabel>
          <Select
            value={newUser.userType}
            label="User Type"
            onChange={(e) =>
              setNewUser({ ...newUser, userType: e.target.value })
            }
          >
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Technician">Technician</MenuItem>
          </Select>

          {/* Conditionally render the repair center input if userType is Technician */}
          {newUser.userType === "Technician" && (
            <FormControl fullWidth>
              <InputLabel>Repair Center</InputLabel>
              <Select
                value={newUser.repairCenter}
                onChange={(e) =>
                  setNewUser({ ...newUser, repairCenter: e.target.value })
                }
              >
                {repairCenters.map((center) => (
                  <MenuItem key={center} value={center}>
                    {center}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateUser} color="primary" disabled={loading}>
            {loading ? (
              <Box display="flex" alignItems="center">
                <CircularProgress size={24} />
              </Box>
            ) : (
              "Create"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!responseMessage} onClose={handleResponseClose}>
        <DialogTitle>Response</DialogTitle>
        <DialogContent>
          <Typography>{responseMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResponseClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
