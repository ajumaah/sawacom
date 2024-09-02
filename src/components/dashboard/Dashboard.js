import { Box, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";
import PhoneModelsGraph from "./PhoneModelsGraph";

const Dashboard = ({
  bookedPhones = [],
  repairedPhones = [],
  collectedPhones = [],
  pendingCollection = [],
}) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Link href="/booked" passHref  style={{ textDecoration: "none" }}>
            <Box
          
              sx={{ textDecoration: "none", display: "block" }}
            >
              <Paper
                elevation={3}
                style={{ padding: "20px", backgroundColor: "#64ffda" }}
              >
                <Typography variant="h5">Booked Phones</Typography>
                <Typography variant="body1">
                  {bookedPhones.length} phones booked
                </Typography>
              </Paper>
            </Box>
          </Link>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            elevation={3}
            style={{ padding: "20px", backgroundColor: "#1de9b6" }}
          >
            <Typography variant="h5">Out for Repair</Typography>
            <Typography variant="body1">
              {bookedPhones.length} Out for Repair
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            elevation={3}
            style={{ padding: "20px", backgroundColor: "#84ffff" }}
          >
            <Typography variant="h5">Repaired Phones</Typography>
            <Typography variant="body1">
              {repairedPhones.length} phones repaired
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            elevation={3}
            style={{ padding: "20px", backgroundColor: "#00bfa5" }}
          >
            <Typography variant="h5">Collected Phones</Typography>
            <Typography variant="body1">
              {collectedPhones.length} phones collected
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            elevation={3}
            style={{ padding: "20px", backgroundColor: "#00e5ff" }}
          >
            <Typography variant="h5">Pending Collection</Typography>
            <Typography variant="body1">
              {pendingCollection.length} phones pending collection
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            elevation={3}
            style={{ padding: "20px", backgroundColor: "#a7ffeb" }}
          >
            <Typography variant="h5">Others</Typography>
            <Typography variant="body1">
              {pendingCollection.length} Others
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid continer>
        <Grid item xs={12} md={6} lg={4} sx={{ mt: 4 }}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <PhoneModelsGraph />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
