import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto', // Push the footer to the bottom
        backgroundColor: 'primary.main',
        color: 'white',
      }}
    >
      <AppBar position="static" color="primary">
        <Container>
          <Toolbar>
            <Typography variant="body1" color="inherit" align="center">
              SCD - Employee Manager
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Footer;
