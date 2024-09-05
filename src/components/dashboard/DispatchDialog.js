import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  TextField,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { SERVER_URL } from "../../../config";

const DispatchDialog = ({ open, onClose, phone }) => {
  const [formData, setFormData] = useState({
    repairCenterName: "",
    courier: "",
    waybillNumber: "",
  });
  const [loading, setLoading] = useState(false); // To handle loading state
  const [error, setError] = useState(""); // To handle any errors

  const repairCenters = ["Nokia Repair Center", "Neon Repair Center", "Vivo Repair Center", "Tecno RepairCenter"]; // Sample repair centers

  if (!phone) return null; // Return null if no phone is selected

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDispatch = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${SERVER_URL}/dispatch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repairsId: phone._id, // Assuming phone has an id property
          repairCenterName: formData.repairCenterName,
          courier: formData.courier,
          waybillNumber: formData.waybillNumber,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to dispatch phone");
      }

      onClose(); // Close the dialog on successful dispatch
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Dispatch Phone</DialogTitle>
      <DialogContent>
        <Typography variant="h6">
          Dispatch Details for {phone.phoneMake} {phone.phoneModel}
        </Typography>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Repair Center</InputLabel>
              <Select
                label="Repair Center"
                name="repairCenterName"
                value={formData.repairCenterName}
                onChange={handleChange}
              >
                {repairCenters.map((center) => (
                  <MenuItem key={center} value={center}>
                    {center}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Courier"
              variant="outlined"
              name="courier"
              value={formData.courier}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Waybill Number"
              variant="outlined"
              name="waybillNumber"
              value={formData.waybillNumber}
              onChange={handleChange}
            />
          </Grid>
          {error && (
            <Grid item>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleDispatch} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Dispatch"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DispatchDialog;