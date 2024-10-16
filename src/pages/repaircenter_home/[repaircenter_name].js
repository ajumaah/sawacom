import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
// import { SERVER_URL } from "../../../config";

const RepairCenterDashboard = () => {
  const router = useRouter();
  const { repaircenter_name } = router.query;

  const [bookedPhones, setBookedPhones] = useState([]);
  const [repairedPhones, setRepairedPhones] = useState([]);
  const [dispatchedPhones, setDispatchedPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("booked"); // State for selected category

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchAllPhones = async () => {
      const token = localStorage.getItem("token");
      if (!repaircenter_name || !token) {
        // Redirect to login if repair center or token is missing
        router.push("/login");
        return;
      }

      try {
        // Fetch booked phones
        const bookedResponse = await fetch(
          `${backendUrl}/booking?center=${repaircenter_name}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const bookedData = await bookedResponse.json();
        setBookedPhones(bookedData);

        // Fetch repaired phones
        const repairedResponse = await fetch(
          `${backendUrl}/repair/repaired?center=${repaircenter_name}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const repairedData = await repairedResponse.json();
        setRepairedPhones(repairedData);

        // Fetch dispatched phones
        const dispatchedResponse = await fetch(
          `${backendUrl}/dispatch?center=${repaircenter_name}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const dispatchedData = await dispatchedResponse.json();
        setDispatchedPhones(dispatchedData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching phone data:", error);
        setLoading(false);
      }
    };

    fetchAllPhones();
  }, [repaircenter_name, router]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const renderTable = () => {
    let data = [];
    let columns = [];

    if (selectedCategory === "booked") {
      data = bookedPhones;
      columns = [
        "Customer Name",
        "Phone Number",
        "Phone Make",
        "Phone Model",
        "IMEI",
        "Phone Issues",
      ];
    } else if (selectedCategory === "repaired") {
      data = repairedPhones;
      columns = [
        "Customer Name",
        "Phone Number",
        "Phone Make",
        "Phone Model",
        "IMEI",
        "Repair Comments",
      ];
    } else if (selectedCategory === "dispatched") {
      data = dispatchedPhones;
      columns = [
        "Customer Name",
        "Phone Number",
        "Phone Make",
        "Phone Model",
        "IMEI",
        "Dispatch Status",
      ];
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col}>{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((phone) => (
                <TableRow key={phone._id}>
                  <TableCell>{phone.customerName}</TableCell>
                  <TableCell>{phone.phoneNumber}</TableCell>
                  <TableCell>{phone.phoneMake}</TableCell>
                  <TableCell>{phone.phoneModel}</TableCell>
                  <TableCell>{phone.imei}</TableCell>
                  {selectedCategory === "booked" && (
                    <TableCell>{phone.phoneIssues}</TableCell>
                  )}
                  {selectedCategory === "repaired" && (
                    <TableCell>{phone.repairComments}</TableCell>
                  )}
                  {selectedCategory === "dispatched" && (
                    <TableCell>{phone.status}</TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No {selectedCategory} phones available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Repair Center: {repaircenter_name}
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <FormControl
            fullWidth
            variant="outlined"
            style={{ marginBottom: "20px" }}
          >
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Category"
            >
              <MenuItem value="booked">Booked Phones</MenuItem>
              <MenuItem value="repaired">Repaired Phones</MenuItem>
              <MenuItem value="dispatched">Dispatched Phones</MenuItem>
            </Select>
          </FormControl>

          {renderTable()}
        </>
      )}
    </Container>
  );
};

export default RepairCenterDashboard;
