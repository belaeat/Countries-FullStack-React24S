import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CountriesList from './Countries/CountriesList';

const Home = () => {
    const { user } = useAuth();

    if (user) {
        return <CountriesList />;
    }

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '80vh',
                    textAlign: 'center',
                }}
            >
                <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 600 }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        Welcome to Countries App
                    </Typography>
                    <Typography variant="h6" color="text.secondary" paragraph>
                        Discover detailed information about countries around the world, including their weather data.
                    </Typography>
                    <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <Button
                            component={Link}
                            to="/login"
                            variant="contained"
                            color="primary"
                            size="large"
                        >
                            Login
                        </Button>
                        <Button
                            component={Link}
                            to="/register"
                            variant="outlined"
                            color="primary"
                            size="large"
                        >
                            Register
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Home; 