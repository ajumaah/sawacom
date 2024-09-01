import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// Sample data
const bookedPhones = [
  {
    customerName: 'John Doe',
    phoneNumber: '1234567890',
    phoneMake: 'Samsung',
    phoneModel: 'Galaxy S21',
    imei: '123456789012345',
    phoneIssues: 'Screen crack',
    dateBooked: '2024-09-01',
  },
  // Add more sample data as needed
];

const BookedPhonesTable = () => {
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
          {bookedPhones.map((phone, index) => (
            <TableRow key={index}>
              <TableCell>{phone.customerName}</TableCell>
              <TableCell>{phone.phoneNumber}</TableCell>
              <TableCell>{phone.phoneMake}</TableCell>
              <TableCell>{phone.phoneModel}</TableCell>
              <TableCell>{phone.imei}</TableCell>
              <TableCell>{phone.phoneIssues}</TableCell>
              <TableCell>{phone.dateBooked}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookedPhonesTable;