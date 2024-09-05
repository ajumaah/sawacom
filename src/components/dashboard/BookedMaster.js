import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import BookedPhonesTable from './BookedPhonesTable';
import { SERVER_URL } from '../../../config';
import RepairCenterDashboard from '../repaircenter/RepairCenter';

const BookedMaster = () => {
  const [bookedPhones, setBookedPhones] = useState([]);
  const [dispatchedPhones, setDispatchedPhones] = useState([]);

  useEffect(() => {
    // Fetch data from the /booking API
    fetch(`${SERVER_URL}/booking`)
      .then((response) => response.json())
      .then((data) => setBookedPhones(data))
      .catch((error) => console.error('Error fetching booked phones:', error));
  }, []);
  useEffect(() => {
    // Fetch data from the /booking API
    fetch(`${SERVER_URL}/dispatch`)
      .then((response) => response.json())
      .then((data) => setDispatchedPhones(data))
      .catch((error) => console.error('Error fetching dispathed phones:', error));
  }, []);

  return (
    <>
      <Dashboard bookedPhones={bookedPhones} />
      <BookedPhonesTable bookedPhones={bookedPhones} />
      <RepairCenterDashboard dispatchedPhones = {dispatchedPhones} />
    </>
  );
};

export default BookedMaster;