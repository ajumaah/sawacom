import React, { useEffect, useState } from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import BookedPhonesTable from '@/components/dashboard/BookedPhones';
import { SERVER_URL } from '../../config';

const DashboardPage = () => {
  const [bookedPhones, setBookedPhones] = useState([]);

  useEffect(() => {
    // Fetch data from the /booking API
    fetch(`${SERVER_URL}/booking`)
      .then((response) => response.json())
      .then((data) => setBookedPhones(data))
      .catch((error) => console.error('Error fetching booked phones:', error));
  }, []);

  return (
    <div>
      <Dashboard bookedPhones={bookedPhones} />
      {/* <BookedPhonesTable bookedPhones={bookedPhones} /> */}
    </div>
  );
};

export default DashboardPage;