import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => (
  <Box display='flex' flexDirection='column' minHeight='100vh'>
    <Header />
    <Container sx={{ flex: 1, py: 4 }} maxWidth='lg'>
      <Outlet />
    </Container>
    <Footer />
  </Box>
);

Layout.displayName = 'Layout';
export default Layout;
