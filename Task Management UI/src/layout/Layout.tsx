import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Layout: React.FC = () => (
  <Box display='flex' flexDirection='column' minHeight='100vh'>
    <Header />
    <Box display='flex' flex={1}>
      <Sidebar />
      <Box component='main' sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
        <Outlet />
      </Box>
    </Box>
    <Footer />
  </Box>
);

Layout.displayName = 'Layout';
export default Layout;
