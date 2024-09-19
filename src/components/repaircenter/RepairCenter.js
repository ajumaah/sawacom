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
} from "@mui/material";
import { SERVER_URL } from "../../../config";

const RepairCenterDashboard = () => {
  const [repairCenters, setRepairCenters] = useState([]);
  const [selectedRepairCenter, setSelectedRepairCenter] = useState("");
  const [phones, setPhones] = useState([]);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  console.log('Backend URL:', process.env.NEXT_PUBLIC_BACKEND_URL);

  useEffect(() => {
    // Fetch repair centers from API
    const fetchRepairCenters = async () => {
      try {
        const response = await fetch(`${backendUrl}/dispatch`);
        const data = await response.json();
        console.log(data); // Log to inspect the data structure

        // Extract unique repair center names using Set
        const uniqueCenters = Array.from(
          new Set(data.map((item) => item.repairCenterName))
        );

        setRepairCenters(uniqueCenters); // Set unique repair centers
      } catch (error) {
        console.error("Error fetching repair centers:", error);
        setRepairCenters([]); // Set to empty array on error
      }
    };
    fetchRepairCenters();
  }, []);
 
  useEffect(() => {
    // Fetch phones when selectedRepairCenter changes
    const fetchPhones = async () => {
      if (selectedRepairCenter) {
        try {
          const response = await fetch(
            `${SERVER_URL}/dispatch?center=${selectedRepairCenter}`
          );
          const data = await response.json();
          console.log(data); // Log data to inspect the structure
          setPhones(data);
        } catch (error) {
          console.error("Error fetching phones:", error);
        }
      }
    };
    fetchPhones();
  }, [selectedRepairCenter]);

  // Filter phones based on the selected repair center and corresponding phone make
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
    }
    
    return true; // If other repair centers, return all phones
  });

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
                  {" "}
                  {/* Use _id for uniqueness */}
                  <TableCell>{row.customerName}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{row.phoneMake}</TableCell>
                  <TableCell>{row.phoneModel}</TableCell>
                  <TableCell>{row.imei}</TableCell>
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
    </Container>
  );
};

export default RepairCenterDashboard;
