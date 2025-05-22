import { AppBar, Toolbar, Typography, Box, Link, IconButton } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../theme/useTheme';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export const Navigation = () => {
    const { user, signOut } = useAuth();
    const { toggleTheme, isDarkMode } = useTheme();
    const navigate = useNavigate();

    const handleProtectedLink = (path: string) => {
        if (!user) {
            navigate('/login', { state: { from: path } });
        } else {
            navigate(path);
        }
    };

    return (
        <AppBar position="static" elevation={1}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h6" component="div">
                        <Link component={RouterLink} to="/" color="inherit" underline="none">
                            Countries App
                        </Link>
                    </Typography>
                    {user && (
                        <Link
                            component={RouterLink}
                            to="/countries"
                            color="inherit"
                            underline="none"
                            sx={{ cursor: 'pointer' }}
                        >
                            Countries
                        </Link>
                    )}
                    {user && (
                        <Link
                            component={RouterLink}
                            to="/favorites"
                            color="inherit"
                            underline="none"
                            sx={{ cursor: 'pointer' }}
                        >
                            Favorites
                        </Link>
                    )}
                    {user && (
                        <Link
                            color="inherit"
                            underline="none"
                            sx={{ cursor: 'pointer' }}
                            onClick={() => handleProtectedLink('/test')}
                        >
                            Protected Test Data
                        </Link>
                    )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton onClick={toggleTheme} color="inherit" size="small">
                        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                    {user ? (
                        <Link color="inherit" onClick={signOut} sx={{ cursor: 'pointer' }}>
                            Logout
                        </Link>
                    ) : (
                        <Link color="inherit" component={RouterLink} to="/login">
                            Login
                        </Link>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}; 