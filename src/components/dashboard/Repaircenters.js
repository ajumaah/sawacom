import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

const RepairCenters = () => {
  const [repairCenters, setRepairCenters] = useState([]);
  const [open, setOpen] = useState(false);
  const [newCenter, setNewCenter] = useState({
    name: "",
    location: "",
    phoneModels: "",
  });

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Fetch repair centers on component mount
  useEffect(() => {
    const fetchRepairCenters = async () => {
      try {
        const response = await fetch(`${backendUrl}/repaircenters`);
        if (!response.ok) {
          throw new Error("Failed to fetch repair centers");
        }
        const data = await response.json();
        setRepairCenters(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRepairCenters();
  }, []);

  // Handle dialog open/close
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    setNewCenter({ ...newCenter, [e.target.name]: e.target.value });
  };

  // Submit new repair center
  const handleSubmit = async () => {
    try {
      const response = await fetch(`${backendUrl}/repaircenters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newCenter.name,
          location: newCenter.location,
          phoneModels: newCenter.phoneModels.split(","),
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create repair center");
      }
      const createdCenter = await response.json();
      setRepairCenters([...repairCenters, createdCenter]);
      setNewCenter({ name: "", location: "", phoneModels: "" }); // Reset form
      handleClose(); // Close dialog
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Repair Centers
      </Typography>

      {/* Create Button */}
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Create New Repair Center
      </Button>

      {/* Dialog for creating a new repair center */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Repair Center</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            value={newCenter.name}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Location"
            name="location"
            value={newCenter.location}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Phone Models (comma separated)"
            name="phoneModels"
            value={newCenter.phoneModels}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Table to display repair centers */}
      <Box mt={4}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Phone Models</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {repairCenters.map((center) => (
                <TableRow key={center._id}>
                  <TableCell>{center.name}</TableCell>
                  <TableCell>{center.location}</TableCell>
                  <TableCell>
                    {center.phoneModels?.join(", ") || "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default RepairCenters;
