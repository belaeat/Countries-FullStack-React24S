import { Box, Typography, Container, Paper } from '@mui/material';

export const Home = () => {
    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 8, textAlign: 'center' }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        Welcome to Countries Full Stack App
                    </Typography>
                    <Typography variant="h6" color="text.secondary" paragraph>
                        Explore countries data and learn more about different regions of the world.
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Please login to access the full features of the application.
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
}; 