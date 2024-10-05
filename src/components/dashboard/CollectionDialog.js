import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { SERVER_URL } from "../../../config";

const CollectionDialog = ({ open, onClose, phone }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    phoneMake: "",
    imei: "",
    phoneModel: "",
    phoneIssues: "",
    sparePartUsed: "",
    comment: "",
  });

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Use useEffect instead of useState directly to populate form data
  useEffect(() => {
    if (phone) {
      setFormData({
        customerName: phone.customerName,
        phoneNumber: phone.phoneNumber,
        phoneMake: phone.phoneMake,
        imei: phone.imei,
        phoneModel: phone.phoneModel,
        phoneIssues: phone.phoneIssues,
        sparePartUsed: "",
        comment: "",
      });
    }
  }, [phone]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCollection = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/repair/collect/${phone._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("Phone Id", phone._id);
      if (response.ok) {
        console.log("Phone successfully collected!");
        // Optionally, refresh the phone list or trigger any other side effects
      } else {
        console.error("Failed to collect.");
      }
    } catch (error) {
      console.error("Error creating collection:", error);
    }
    onClose(); // Close dialog after successful submission
  };

  // Prevent rendering if no phone is passed
  if (!phone) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Collection</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Customer Name"
          name="customerName"
          value={formData.customerName}
          onChange={handleFormChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleFormChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Phone Make"
          name="phoneMake"
          value={formData.phoneMake}
          onChange={handleFormChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="IMEI"
          name="imei"
          value={formData.imei}
          onChange={handleFormChange}
          disabled // IMEI is not editable
        />
        <TextField
          fullWidth
          margin="normal"
          label="Phone Model"
          name="phoneModel"
          value={formData.phoneModel}
          onChange={handleFormChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Collected By"
          name="collectedBy"
          value={formData.collectedBy}
          onChange={handleFormChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Id"
          name="id"
          value={formData.id}
          onChange={handleFormChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Comment"
          name="comment"
          value={formData.comment}
          onChange={handleFormChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleCollection} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CollectionDialog;