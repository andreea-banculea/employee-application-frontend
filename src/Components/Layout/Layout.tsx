import React, { FC, ReactNode } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Container, Box } from '@mui/material';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';

const theme = createTheme();

interface LayoutProps {
 children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
   return (
       <ThemeProvider theme={theme}>
           <CssBaseline />
           <Box
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '100vh',
               }}
           >
               <Navigation />
               <Container
                  component="main"
                  sx={{
                      flexGrow: 1,
                      mt: 4,
                  }}
               >
                  {children}
               </Container>
               <Footer />
           </Box>
       </ThemeProvider>
   );
};

export default Layout;