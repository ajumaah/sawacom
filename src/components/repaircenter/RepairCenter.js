import { useState, useEffect } from 'react';
import { Container, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const RepairCenterDashboard = () => {
  const [repairCenters, setRepairCenters] = useState([]);
  const [selectedRepairCenter, setSelectedRepairCenter] = useState('');
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    // Fetch repair centers from API
    const fetchRepairCenters = async () => {
      const response = await fetch('/api/repair-centers');
      const data = await response.json();
      setRepairCenters(data);
    };
    fetchRepairCenters();
  }, []);

  useEffect(() => {
    // Fetch phones when selectedRepairCenter changes
    const fetchPhones = async () => {
      if (selectedRepairCenter) {
        const response = await fetch(`/api/phones?repairCenter=${selectedRepairCenter}`);
        const data = await response.json();
        setPhones(data);
      }
    };
    fetchPhones();
  }, [selectedRepairCenter]);

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
            <MenuItem key={center.name} value={center.name}>
              {center.name}
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
              <TableCell>Email</TableCell>
              <TableCell>Phone Make</TableCell>
              <TableCell>Phone Model</TableCell>
              <TableCell>IMEI</TableCell>
              <TableCell>Phone Issues</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Repair Center</TableCell>
              <TableCell>Courier</TableCell>
              <TableCell>Waybill Number</TableCell>
              <TableCell>Repair Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {phones.map((phone) => (
              <TableRow key={phone.imei}>
                <TableCell>{phone.customerName}</TableCell>
                <TableCell>{phone.phoneNumber}</TableCell>
                <TableCell>{phone.email}</TableCell>
                <TableCell>{phone.phoneMake}</TableCell>
                <TableCell>{phone.phoneModel}</TableCell>
                <TableCell>{phone.imei}</TableCell>
                <TableCell>{phone.phoneIssues}</TableCell>
                <TableCell>{new Date(phone.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{phone.status}</TableCell>
                <TableCell>{phone.repairCenterName}</TableCell>
                <TableCell>{phone.courier}</TableCell>
                <TableCell>{phone.waybillNumber}</TableCell>
                <TableCell>{new Date(phone.repairDate).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default RepairCenterDashboard;