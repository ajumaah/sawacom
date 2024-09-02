import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import BookedPhonesTable from './BookedPhonesTable';
import { SERVER_URL } from '../../../config';

const BookedMaster = () => {
  const [bookedPhones, setBookedPhones] = useState([]);

  useEffect(() => {
    // Fetch data from the /booking API
    fetch(`${SERVER_URL}/booking`)
      .then((response) => response.json())
      .then((data) => setBookedPhones(data))
      .catch((error) => console.error('Error fetching booked phones:', error));
  }, []);

  return (
    <>
      <Dashboard bookedPhones={bookedPhones} />
      <BookedPhonesTable bookedPhones={bookedPhones} />
    </>
  );
};

export default BookedMaster;