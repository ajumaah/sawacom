import React, { useEffect, useState } from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import { SERVER_URL } from "../../config";
// import { SERVER_URL } from "../../config";

const DashboardPage = () => {
  const [bookedPhones, setBookedPhones] = useState([]);
  const [dispatchedPhones, setDispatchedPhones] = useState([]);
  const [repairedPhones, setRepairedPhones] = useState([]);
  const [repaircenters, setRepaircenters] = useState([]);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    // Fetch data from the /booking API
    fetch(`${backendUrl}/booking`)
      .then((response) => response.json())
      .then((data) => setBookedPhones(data))
      .catch((error) => console.error("Error fetching booked phones:", error));
  }, []);

  useEffect(() => {
    // Fetch data from the /booking API
    fetch(`${backendUrl}/dispatch`)
      .then((response) => response.json())
      .then((data) => setDispatchedPhones(data))
      .catch((error) => console.error("Error fetching booked phones:", error));
  }, []);
  useEffect(() => {
    // Fetch data from the /booking API
    fetch(`${backendUrl}/repair/returned`)
      .then((response) => response.json())
      .then((data) => setRepairedPhones(data))
      .catch((error) => console.error("Error fetching repaired phones:", error));
  }, []);
  useEffect(() => {
    // Fetch data from the /booking API
    fetch(`${SERVER_URL}/repaircenters`)
      .then((response) => response.json())
      .then((data) => setRepaircenters(data))
      .catch((error) => console.error("Error fetching Repair centers:", error));
  }, []);
  return (
    <div>
      <Dashboard
        bookedPhones={bookedPhones}
        dispatchedPhones={dispatchedPhones}
        repairedPhones={repairedPhones}
        repaircenters={repaircenters}
      />
    </div>
  );
};

export default DashboardPage;
