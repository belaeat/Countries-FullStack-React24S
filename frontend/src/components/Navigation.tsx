import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navigation = () => {
    const { user, signOut } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
                    <Button color="inherit" component={RouterLink} to="/">
                        Home
                    </Button>
                    {user && (
                        <Button color="inherit" component={RouterLink} to="/test">
                            Protected Test Data
                        </Button>
                    )}
                </Box>
                <Box>
                    {user ? (
                        <Button color="inherit" onClick={signOut}>
                            Logout
                        </Button>
                    ) : (
                        <Button color="inherit" component={RouterLink} to="/login">
                            Login
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}; 