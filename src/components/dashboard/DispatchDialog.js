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
} from "@mui/material";

const DispatchDialog = ({ open, onClose, phone }) => {
  const [formData, setFormData] = useState({
    repairCenter: "",
    courior: "",
    waybillNumber: ""
  });
  if (!phone) return null; // Return null if no phone is selected

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Dispatch Phone</DialogTitle>
      <DialogContent>
        <Typography variant="h6">
          Dispatch Details for  {phone.phoneMake} {phone.phoneModel}
        </Typography>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <TextField
              fullWidth
              label="Repair Center"
              variant="outlined"
              name="repairCenter"
              value={formData.repairCenter}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Courior"
              variant="outlined"
              name="courior"
              value={formData.courior}
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
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary">
          Dispatch
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DispatchDialog;
