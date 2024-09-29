import React, { useState } from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Typography, 
  Divider, 
  Collapse
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
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const Sidebar = () => {
  const [openRepairCenter, setOpenRepairCenter] = useState(false);

  const handleRepairCenterClick = () => {
    setOpenRepairCenter(!openRepairCenter);
  };

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
      <ListItem button component="a" href="/master">
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
      <ListItem button component="a" href="/">
        <ListItemIcon>
          <AnalyticsIcon />
        </ListItemIcon>
        <ListItemText primary="Analytic" />
      </ListItem>

      <Typography variant="subtitle1">General</Typography>
      <Divider />
      
      {/* Repair Center with child items */}
      <ListItem button onClick={handleRepairCenterClick}>
        <ListItemIcon>
          <ContactsIcon />
        </ListItemIcon>
        <ListItemText primary="Repair Centre" />
        {openRepairCenter ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openRepairCenter} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItem button component="a" href="/repaircenter" sx={{ pl: 4 }}>
            <ListItemIcon>
              <ContactsIcon />
            </ListItemIcon>
            <ListItemText primary="Work in Progress" />
          </ListItem>
          <ListItem button component="a" href="/repaired" sx={{ pl: 4 }}>
            <ListItemIcon>
              <ContactsIcon />
            </ListItemIcon>
            <ListItemText primary="Repaired" />
          </ListItem>
          <ListItem button component="a" href="/returnedPhones" sx={{ pl: 4 }}>
            <ListItemIcon>
              <ContactsIcon />
            </ListItemIcon>
            <ListItemText primary="Dispatched" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button component="a" href="/">
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Groups" />
      </ListItem>
      <ListItem button component="a" href="/">
        <ListItemIcon>
          <MoveUpIcon />
        </ListItemIcon>
        <ListItemText primary="Transfer" />
      </ListItem>
      <ListItem button component="a" href="/">
        <ListItemIcon>
          <FlagIcon />
        </ListItemIcon>
        <ListItemText primary="All Reports" />
      </ListItem>
      <ListItem button component="a" href="/">
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
      <ListItem button component="a" href="/">
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
      <ListItem button component="a" href="/login">
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