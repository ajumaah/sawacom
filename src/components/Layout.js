import { Box } from '@mui/material';

import Sidebar from './Home';
// import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        {/* <Topbar /> */}
        <Box p={2}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}