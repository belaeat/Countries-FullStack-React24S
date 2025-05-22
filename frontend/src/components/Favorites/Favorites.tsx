import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, IconButton, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { favoritesApi } from '../../api/services/favorites';
import { CountryFavorite } from '../../types/favorite';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

export const Favorites = () => {
    const [favorites, setFavorites] = useState<CountryFavorite[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [countryToDelete, setCountryToDelete] = useState<string | null>(null);
    const { user } = useAuth();

    const loadFavorites = async () => {
        try {
            const data = await favoritesApi.getFavorites();
            setFavorites(data);
            setError(null);
        } catch (err) {
            setError('Failed to load favorites');
            console.error(err);
        }
    };

    const handleDeleteClick = (e: React.MouseEvent, countryName: string) => {
        e.preventDefault();
        e.stopPropagation();
        setCountryToDelete(countryName);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!countryToDelete) return;

        try {
            await favoritesApi.removeFavorite(countryToDelete);
            setFavorites(favorites.filter(fav => fav.country_name !== countryToDelete));
            setError(null);
            toast.info(`${countryToDelete} removed from favorites`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (err) {
            setError('Failed to remove favorite');
            toast.error('Failed to remove from favorites');
            console.error(err);
        }
        setDeleteDialogOpen(false);
        setCountryToDelete(null);
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
        setCountryToDelete(null);
    };

    useEffect(() => {
        if (user) {
            loadFavorites();
        }
    }, [user]);

    if (!user) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="info">Please log in to view your favorites</Alert>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                My Favorite Countries
            </Typography>
            {favorites.length === 0 ? (
                <Alert severity="info">No favorite countries yet</Alert>
            ) : (
                <Grid container spacing={3}>
                    {favorites.map((favorite) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={favorite.id}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <Link
                                    to={`/countries/${encodeURIComponent(favorite.country_name)}`}
                                    style={{ textDecoration: 'none', flex: 1 }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={favorite.country_flag}
                                        alt={`${favorite.country_name} flag`}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                            <Typography variant="h6" component="div" color="text.primary">
                                                {favorite.country_name}
                                            </Typography>
                                            <IconButton
                                                onClick={(e) => handleDeleteClick(e, favorite.country_name)}
                                                color="error"
                                                size="small"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ mt: 1 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Region:</strong> {favorite.region || 'N/A'}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Capital:</strong> {favorite.capital || 'N/A'}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Population:</strong> {favorite.population?.toLocaleString() || 'N/A'}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Link>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <Dialog
                open={deleteDialogOpen}
                onClose={handleCancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Remove from Favorites?
                </DialogTitle>
                <DialogContent>
                    Are you sure you want to remove {countryToDelete} from your favorites?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" autoFocus>
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}; 