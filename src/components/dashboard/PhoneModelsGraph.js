import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const phoneModelsData = [
//   { name: 'Nokia', count: 400 },
//   { name: 'Samsung', count: 300 },
//   { name: 'Oppo', count: 200 },
//   { name: 'Tecno', count: 278 },
//   { name: 'Vivo', count: 189 },
//   { name: 'Neon', count: 239 }
// ];

const PhoneModelsGraph = ({ phoneModelsData }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={10}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5" gutterBottom>Phone Models</Typography>
          <ResponsiveContainer maxWidth="100%" height={200}>
            <BarChart
              data={phoneModelsData}
              margin={{
                top: 5, right: 30, left: 30, bottom: 5,
              }}
              style={{backgroundColor: "#1de9b6"}}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PhoneModelsGraph;