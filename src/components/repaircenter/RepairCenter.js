import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { SERVER_URL } from "../../../config";

const RepairCenterDashboard = () => {
  const [repairCenters, setRepairCenters] = useState([]);
  const [selectedRepairCenter, setSelectedRepairCenter] = useState("");
  const [phones, setPhones] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState(null); // State for selected phone
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

  useEffect(() => {
    const fetchRepairCenters = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/dispatch`);
        const data = await response.json();
        const uniqueCenters = Array.from(
          new Set(data.map((item) => item.repairCenterName))
        );
        setRepairCenters(uniqueCenters);
      } catch (error) {
        console.error("Error fetching repair centers:", error);
        setRepairCenters([]);
      }
    };
    fetchRepairCenters();
  }, []);

  useEffect(() => {
    const fetchPhones = async () => {
      if (selectedRepairCenter) {
        try {
          const response = await fetch(
            `${SERVER_URL}/dispatch?center=${selectedRepairCenter}`
          );
          const data = await response.json();
          setPhones(data);
        } catch (error) {
          console.error("Error fetching phones:", error);
        }
      }
    };
    fetchPhones();
  }, [selectedRepairCenter]);

  const filteredPhones = phones.filter((phone) => {
    if (selectedRepairCenter.includes("Nokia")) {
      return phone.phoneMake === "Nokia";
    } else if (selectedRepairCenter.includes("Neon")) {
      return phone.phoneMake === "Neon";
    } else if (selectedRepairCenter.includes("Vivo Service Center")) {
      return phone.phoneMake === "Vivo";
    } else if (selectedRepairCenter.includes("Samsung")) {
      return phone.phoneMake === "Samsung";
    } else if (selectedRepairCenter.includes("Oppo")) {
      return phone.phoneMake === "Oppo";
    } else if (selectedRepairCenter.includes("Tecno")) {
    return phone.phoneMake === "Tecno";
  }
    return true;
  });

  const handleClickIMEI = (phone) => {
    setSelectedPhone(phone);
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
    setOpenDialog(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPhone(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmitRepair = async () => {
    if (selectedPhone) {
      try {
        const response = await fetch(`${SERVER_URL}/repair/${selectedPhone._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        console.log("Selected Phone ID:", selectedPhone._id);
        if (response.ok) {
          console.log("Phone successfully repaired!");
          // Optionally, refresh the phone list to reflect the updated status
        } else {
          console.error("Failed to repair phone.");
        }
      } catch (error) {
        console.error("Error repairing phone:", error);
      }
    }
  
    handleCloseDialog();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Phone Repair Dashboard
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Repair Center</InputLabel>
        <Select
          value={selectedRepairCenter}
          onChange={(e) => setSelectedRepairCenter(e.target.value)}
        >
          {repairCenters.map((center) => (
            <MenuItem key={center} value={center}>
              {center}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Phone Make</TableCell>
              <TableCell>Phone Model</TableCell>
              <TableCell>IMEI</TableCell>
              <TableCell>Phone Issues</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Repair Center</TableCell>
              <TableCell>Courier</TableCell>
              <TableCell>Waybill Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPhones.length > 0 ? (
              filteredPhones.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.customerName}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{row.phoneMake}</TableCell>
                  <TableCell>{row.phoneModel}</TableCell>
                  <TableCell onClick={() => handleClickIMEI(row)} style={{ cursor: "pointer", color: "blue" }}>
                    {row.imei}
                  </TableCell>
                  <TableCell>{row.phoneIssues}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.repairCenterName}</TableCell>
                  <TableCell>{row.courier}</TableCell>
                  <TableCell>{row.waybillNumber}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10}>No phones available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Repair Form */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Repair Phone</DialogTitle>
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
            disabled // Disable IMEI since it's not editable
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
            label="Phone Issues"
            name="phoneIssues"
            value={formData.phoneIssues}
            onChange={handleFormChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Spare Part Used"
            name="sparePartUsed"
            value={formData.sparePartUsed}
            onChange={handleFormChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Comment"
            name="repairComments"
            value={formData.repairComments}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmitRepair} variant="contained" color="primary">
            Submit Repair
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RepairCenterDashboard;