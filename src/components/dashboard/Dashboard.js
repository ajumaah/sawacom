import { Box, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";
import PhoneModelsGraph from "./PhoneModelsGraph";

const Dashboard = ({
  bookedPhones = [],
  dispatchedPhones = [],
  repairedPhones = [],
  repaircenters = [],
  phoneModelsData = [],
  collectedPhones = []
  // pendingCollection = [],
}) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Link href="/booked" passHref style={{ textDecoration: "none" }}>
            <Box sx={{ textDecoration: "none", display: "block" }}>
              <Paper
                elevation={3}
                style={{ padding: "20px", backgroundColor: "#64ffda" }}
              >
                <Typography variant="h5">Booked Phones</Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <Typography variant="body1" sx={{ mr: 1 }}>No of booked Phones: </Typography>
                  <Box
                    sx={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "20%",
                      backgroundColor: "magenta",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "10px",
                    }}
                  >
                    {bookedPhones.length}
                  </Box>
                  
                </Box>
              </Paper>
            </Box>
          </Link>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Link
            href="/repaircenter"
            passHref
            style={{ textDecoration: "none" }}
          >
            <Box sx={{ textDecoration: "none", display: "block" }}>
              <Paper
                elevation={3}
                style={{ padding: "20px", backgroundColor: "#64ffda" }}
              >
                <Typography variant="h5">Out For Repair</Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                   <Typography variant="body1" sx={{ mr: 1 }}>No out for repair: </Typography>
                  <Box
                    sx={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "20%",
                      backgroundColor: "red",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "10px",
                    }}
                  >
                    {dispatchedPhones.length}
                  </Box>
                 
                </Box>
              </Paper>
            </Box>
          </Link>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
        <Link
            href="/returnedPhones"
            passHref
            style={{ textDecoration: "none" }}
          >
          <Paper
            elevation={3}
            style={{ padding: "20px", backgroundColor: "#84ffff" }}
          >
            <Typography variant="h5">Repaired Phones</Typography>
            <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                   <Typography variant="body1" sx={{ mr: 1 }}>Repaired: </Typography>
                  <Box
                    sx={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "20%",
                      backgroundColor: "grey",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "10px",
                    }}
                  >
                    {repairedPhones.length}
                  </Box>
                 
                </Box>
          </Paper>
          </Link>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
        <Link
            href="/allreports"
            passHref
            style={{ textDecoration: "none" }}
          >
          <Paper
            elevation={3}
            style={{ padding: "20px", backgroundColor: "#00bfa5" }}
          >
            <Typography variant="h5">Collected Phones</Typography>
            <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                   <Typography variant="body1" sx={{ mr: 1 }}>Collected: </Typography>
                  <Box
                    sx={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "20%",
                      backgroundColor: "purple",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "10px",
                    }}
                  >
                    {collectedPhones.length}
                  </Box>
                 
                </Box>
          </Paper>
          </Link>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            elevation={3}
            style={{ padding: "20px", backgroundColor: "#00e5ff" }}
          >
            <Typography variant="h5">Pending Collection</Typography>
            <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                   <Typography variant="body1" sx={{ mr: 1 }}>To be collected: </Typography>
                  <Box
                    sx={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "20%",
                      backgroundColor: "blue",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "10px",
                    }}
                  >
                    {repairedPhones.length}
                  </Box>
                 
                </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
        <Link
            href="/repaircenters"
            passHref
            style={{ textDecoration: "none" }}
          >
          <Paper
            elevation={3}
            style={{ padding: "20px", backgroundColor: "#a7ffeb" }}
          >
            <Typography variant="h5">Repair Centers</Typography>
            <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                   <Typography variant="body1" sx={{ mr: 1 }}>Repair Centers: </Typography>
                  <Box
                    sx={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "20%",
                      backgroundColor: "magenta",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "10px",
                    }}
                  >
                    {repaircenters.length}
                  </Box>
                 
                </Box>
          </Paper>
          </Link>
        </Grid>
      </Grid>
      <Grid continer>
        <Grid item xs={12} md={6} lg={4} sx={{ mt: 4 }}>
          <Paper elevation={3} style={{ padding: "20px" }}>
          <PhoneModelsGraph phoneModelsData={phoneModelsData} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
