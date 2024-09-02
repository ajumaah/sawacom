import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { SERVER_URL } from '../../../config';

const BookedPhonesTable = () => {
  const [bookedPhones, setBookedPhones] = useState([]);

  useEffect(() => {
    // Fetch data from the /booked API
    fetch(`${SERVER_URL}/booking`)
      .then((response) => response.json())
      .then((data) => setBookedPhones(data))
      .catch((error) => console.error('Error fetching booked phones:', error));
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead style={{ padding: '20px', backgroundColor: "#64ffda" }}>
          <TableRow>
            <TableCell>Customer Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Phone Make</TableCell>
            <TableCell>Phone Model</TableCell>
            <TableCell>IMEI</TableCell>
            <TableCell>Phone Issues</TableCell>
            <TableCell>Date Booked</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookedPhones.length > 0 ? (
            bookedPhones.map((phone, index) => (
              <TableRow key={index}>
                <TableCell>{phone.customerName}</TableCell>
                <TableCell>{phone.phoneNumber}</TableCell>
                <TableCell>{phone.phoneMake}</TableCell>
                <TableCell>{phone.phoneModel}</TableCell>
                <TableCell>{phone.imei}</TableCell>
                <TableCell>{phone.phoneIssues}</TableCell>
                <TableCell>{formatDate(phone.createdAt)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No booked phones found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookedPhonesTable;