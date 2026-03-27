import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer: React.FC = () => (
  <Box
    component='footer'
    sx={{ p: 2, textAlign: 'center', bgcolor: 'background.paper', mt: 'auto' }}
  >
    <Typography variant='body2' color='text.secondary'>
      © {new Date().getFullYear()} Task Management System
    </Typography>
  </Box>
);

Footer.displayName = 'Footer';

export default Footer;
