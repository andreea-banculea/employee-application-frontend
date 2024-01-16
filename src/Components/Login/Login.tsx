// Your login component

import { useState } from 'react';
import { Card, Stack, TextField, Container, CssBaseline, Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useLoginQuery } from '../../api/api';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { data, error, isLoading, refetch } = useLoginQuery({ email, password });

    const handleLogin = () => {
        refetch(); // Trigger the login query
    };

    // Handle the response
    if (data) {
        // Login successful, navigate to the desired page
        navigate('/employees');
    }

    return (
        <>
            <CssBaseline />
            <Container
                component="main"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <Card sx={{ padding: '100px' }}>
                    <Stack gap={'50px'}>
                        <Typography>Welcome!</Typography>
                        <TextField label='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Button variant='contained' onClick={handleLogin} disabled={isLoading}>Login</Button>
                    </Stack>
                </Card>
            </Container>
        </>
    );
}

export default Login;
