import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <footer>
      <Box
        sx={{
          width: '100%',
          height: "5vh",
          textAlign: 'center',
          backgroundColor: 'primary.main',
          color:"white"
        }}
      >
        <Typography>Ravit&Rotem &copy; 2021</Typography>
      </Box>
    </footer>
  )
}

export default Footer
