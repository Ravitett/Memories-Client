import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

const Footer = () => {
  return (
    <footer>
      <Box
        sx={{
          width: '100%',
          py:3,
          mt: 1,
          textAlign: 'center',
          backgroundColor: 'primary.main',
          color:"white"
        }}
      >
        <p>Ravit&Rotem &copy; 2021</p>
      </Box>
    </footer>
  )
}

export default Footer
