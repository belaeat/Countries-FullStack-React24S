import { Box, Container, Typography, useTheme } from '@mui/material';

const Footer = () => {
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : theme.palette.grey[200],
                color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="body2" color="text.secondary" align="center">
                    © {new Date().getFullYear()} Countries Full Stack Application. Developed by{' '}
                    <Box
                        component="a"
                        href="https://github.com/belaeat"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            color: theme.palette.mode === 'dark' ? 'secondary.light' : 'primary.main',
                            textDecoration: 'none',
                            '&:hover': {
                                color: theme.palette.mode === 'dark' ? 'secondary.main' : 'primary.dark',
                            },
                        }}
                    >
                        Hossain
                    </Box>
                    .
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer; 