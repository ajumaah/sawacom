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
} from "@mui/material";
// import { SERVER_URL } from "../../../config";
import ReturnDialog from "./ReturnDialog";

const RepairedPhones = () => {
  const [repairedPhones, setRepairedPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  console.log('Backend URL:', backendUrl);
  useEffect(() => {
    // Fetch data from the /repair API
    fetch(`${backendUrl}/repair`)
      .then((response) => response.json())
      .then((data) => {
        setRepairedPhones(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching repaired phones:", error);
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

  const handleOpenDialog = (phone) => {
    setSelectedPhone(phone);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPhone(null);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ padding: "20px", backgroundColor: "#64ffda" }}>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Phone Make</TableCell>
              <TableCell>Phone Model</TableCell>
              <TableCell>IMEI</TableCell>
              <TableCell>Phone Issues</TableCell>
              <TableCell>Repair Comments</TableCell>
              <TableCell>Spare Part Used</TableCell>
              <TableCell>Dispatch</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : repairedPhones.length > 0 ? (
              repairedPhones.map((phone, index) => (
                <TableRow key={index}>
                  <TableCell>{phone.customerName}</TableCell>
                  <TableCell>{phone.phoneNumber}</TableCell>
                  <TableCell>{phone.phoneMake}</TableCell>
                  <TableCell>{phone.phoneModel}</TableCell>
                  <TableCell>{phone.imei}</TableCell>
                  <TableCell>{phone.phoneIssues}</TableCell>
                  <TableCell>{phone.repairComments}</TableCell>
                  <TableCell>{phone.sparePartUsed}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenDialog(phone)}
                    >
                      Create Dispatch
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No Repaired phones found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <TablePagination
            component="div"
            count={repairedPhones.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </TableContainer>

      {/* Dispatch Dialog */}
      <ReturnDialog
        open={openDialog}
        onClose={handleCloseDialog}
        phone={selectedPhone}
      />
    </div>
  );
};

export default RepairedPhones;