import { IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { favoritesApi } from '../../api/services/favorites';
import { Country } from '../../types/country';

interface FavoriteButtonProps {
    countryName: string;
    country?: Country;
    onFavoriteChange?: (isFavorite: boolean) => void;
}

export const FavoriteButton = ({ countryName, country, onFavoriteChange }: FavoriteButtonProps) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            try {
                const status = await favoritesApi.isFavorite(countryName);
                setIsFavorite(status);
            } catch (error) {
                console.error('Error checking favorite status:', error);
            }
        };
        checkFavoriteStatus();
    }, [countryName]);

    const handleAddFavorite = async () => {
        try {
            if (country) {
                await favoritesApi.addFavorite(country);
                setIsFavorite(true);
                onFavoriteChange?.(true);
                toast.success(`${countryName} added to favorites!`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            console.error('Error adding favorite:', error);
            toast.error('Failed to add to favorites');
        }
    };

    const handleRemoveFavorite = async () => {
        try {
            await favoritesApi.removeFavorite(countryName);
            setIsFavorite(false);
            onFavoriteChange?.(false);
            toast.info(`${countryName} removed from favorites`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            console.error('Error removing favorite:', error);
            toast.error('Failed to remove from favorites');
        }
        setShowConfirmDialog(false);
    };

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFavorite) {
            setShowConfirmDialog(true);
        } else {
            handleAddFavorite();
        }
    };

    return (
        <>
            <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
                <IconButton
                    onClick={handleClick}
                    color={isFavorite ? "warning" : "default"}
                    size="small"
                >
                    {isFavorite ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
            </Tooltip>

            <Dialog
                open={showConfirmDialog}
                onClose={() => setShowConfirmDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Remove from Favorites?
                </DialogTitle>
                <DialogContent>
                    Are you sure you want to remove {countryName} from your favorites?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowConfirmDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleRemoveFavorite} color="error" autoFocus>
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}; 