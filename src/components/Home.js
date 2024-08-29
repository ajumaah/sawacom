import React from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Typography, 
  Divider 
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InboxIcon from '@mui/icons-material/Inbox';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ContactsIcon from '@mui/icons-material/Contacts';
import GroupIcon from '@mui/icons-material/Group';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import FlagIcon from '@mui/icons-material/Flag';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <img src="/images/logo.png" alt="Sawacom" style={{ width: '100%' }} />
        <Typography variant="h6">Sawacom</Typography>
      </Box>

      <List>
        <Typography variant="subtitle1">Main Menu</Typography>
        <Divider />
        <ListItem button component="a" href="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component="a" href="/booking">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Booking" />
        </ListItem>
        <ListItem button component="a" href="#Analytic">
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Analytic" />
        </ListItem>
        
        <Typography variant="subtitle1">General</Typography>
        <Divider />
        <ListItem button component="a" href="#Repair Center">
          <ListItemIcon>
            <ContactsIcon />
          </ListItemIcon>
          <ListItemText primary="Repair Centre" />
        </ListItem>
        <ListItem button component="a" href="#Groups">
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Groups" />
        </ListItem>
        <ListItem button component="a" href="#Transfer">
          <ListItemIcon>
            <MoveUpIcon />
          </ListItemIcon>
          <ListItemText primary="Transfer" />
        </ListItem>
        <ListItem button component="a" href="#All Reports">
          <ListItemIcon>
            <FlagIcon />
          </ListItemIcon>
          <ListItemText primary="All Reports" />
        </ListItem>
        <ListItem button component="a" href="#Notifications">
          <ListItemIcon>
            <NotificationsActiveIcon />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>
        
        <Typography variant="subtitle1">Account</Typography>
        <Divider />
        <ListItem button component="a" href="/profile">
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button component="a" href="#Settings">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button component="a" href="/dist/pages/login.html">
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>

      <Box sx={{ padding: 2, textAlign: 'center' }}>
        <Typography variant="h6">Alfonse Juma</Typography>
        <Typography variant="body2">Web Developer</Typography>
      </Box>
    </Drawer>
  );
};

export default Sidebar;