import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  CircularProgress,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Typography,
} from "@mui/material";
import { SERVER_URL } from "../../config";

const BookedPhonesTable = () => {
  const [collectedPhones, setCollectedPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [phoneMakeFilter, setPhoneMakeFilter] = useState(""); // State for selected phone make
  const [phoneMakes, setPhoneMakes] = useState([]); // State for phone makes list

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    // Fetch data from the /booking API
    fetch(`${backendUrl}/repair/collected`)
      .then((response) => response.json())
      .then((data) => {
        setCollectedPhones(data);
        setLoading(false);

        // Extract unique phone makes for the filter dropdown
        const uniquePhoneMakes = [
          ...new Set(data.map((phone) => phone.phoneMake)),
        ];
        setPhoneMakes(uniquePhoneMakes);
      })
      .catch((error) => {
        console.error("Error fetching collected phones:", error);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter collected phones by selected phone make
  const filteredPhones = phoneMakeFilter
    ? collectedPhones.filter((phone) => phone.phoneMake === phoneMakeFilter)
    : collectedPhones;

  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#00bfa5", padding: 2 }}
          >
            Repaired Collected Phones
          </Typography>
        </Grid>
      </Grid>
      {/* Filter by Phone Make */}
      <Box
        mb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Phone Make</InputLabel>
          <Select
            value={phoneMakeFilter}
            onChange={(e) => setPhoneMakeFilter(e.target.value)}
            label="Filter by Phone Make"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {phoneMakes.map((make, index) => (
              <MenuItem key={index} value={make}>
                {make}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={() => setPhoneMakeFilter("")}>
          Reset Filter
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ padding: "20px", backgroundColor: "#64ffda" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Customer Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Phone Number</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Phone Make</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Phone Model</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>IMEI</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Phone Issues</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date Collected</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Repair Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : filteredPhones.length > 0 ? (
              filteredPhones.map((phone, index) => (
                <TableRow key={index}>
                  <TableCell>{phone.customerName}</TableCell>
                  <TableCell>{phone.phoneNumber}</TableCell>
                  <TableCell>{phone.phoneMake}</TableCell>
                  <TableCell>{phone.phoneModel}</TableCell>
                  <TableCell>{phone.imei}</TableCell>
                  <TableCell>{phone.phoneIssues}</TableCell>
                  <TableCell>{formatDate(phone.createdAt)}</TableCell>
                  <TableCell>{phone.sparePartUsed}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No booked phones found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <TablePagination
            component="div"
            count={filteredPhones.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </TableContainer>
    </div>
  );
};

export default BookedPhonesTable;
