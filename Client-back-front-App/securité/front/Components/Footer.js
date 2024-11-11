// Footer.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60px',
        backgroundColor: '#333',
        color: '#fff',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        textAlign: 'center',
      }}
    >
      <Typography variant="body1">
        &copy; {new Date().getFullYear()} Biird Model Classification. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
