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
  Typography,
} from "@mui/material";
import CollectionDialog from "./CollectionDialog";

const RepairedReturned = () => {
  const [returnedPhones, setReturnedPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    // Fetch data from the /repair/get/returned API
    fetch(`${backendUrl}/repair/returned`)
      .then((response) => response.json())
      .then((data) => {
        setReturnedPhones(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching returned phones:", error);
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
         <Typography variant="h5">Repaired Items</Typography>
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
              <TableCell>Comments</TableCell>
              <TableCell>Spare Part Used</TableCell>
              <TableCell>Waybill Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : returnedPhones.length > 0 ? (
              returnedPhones.map((phone, index) => (
                <TableRow key={index}>
                  <TableCell>{phone.customerName}</TableCell>
                  <TableCell>{phone.phoneNumber}</TableCell>
                  <TableCell>{phone.phoneMake}</TableCell>
                  <TableCell>{phone.phoneModel}</TableCell>
                  <TableCell>{phone.imei}</TableCell>
                  <TableCell>{phone.phoneIssues}</TableCell>
                  <TableCell>{phone.repairComments}</TableCell>
                  <TableCell>{phone.sparePartUsed}</TableCell>
                  <TableCell>{phone.waybillNumber}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                       size="small"
                      onClick={() => handleOpenDialog(phone)}
                      style={{ textTransform: 'none'}} 
                    >
                     Collection                  
                     </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No record available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <TablePagination
            component="div"
            count={returnedPhones.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </TableContainer>

      {/* Dispatch Dialog */}
      <CollectionDialog
        open={openDialog}
        onClose={handleCloseDialog}
        phone={selectedPhone}
      />
    </div>
  );
};

export default RepairedReturned;
