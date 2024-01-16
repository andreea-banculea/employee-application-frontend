import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ButtonBase } from '@mui/material';

const pages = ['Employees', 'Departments'];

function Navigation() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <ButtonBase disableRipple={true} onClick={() => navigate('/employees')}>
                        <Home sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 3,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            HOME
                        </Typography>
                    </ButtonBase>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem onClick={() => navigate('/employees')}>
                                <Typography textAlign="center">Employees</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/departments')}>
                                <Typography textAlign="center">Departments</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <ButtonBase disableRipple={true} onClick={() => navigate('/employees')}>
                        <Home sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            HOME
                        </Typography>
                    </ButtonBase>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            onClick={() => navigate('/employees')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Employees
                        </Button>
                        <Button
                            onClick={() => navigate('/departments')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Departments
                        </Button>
                    </Box>
                    <Button variant='contained'>Log Out</Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navigation;
