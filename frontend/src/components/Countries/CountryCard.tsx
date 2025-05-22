import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Country } from '../../types/country';
import { FavoriteButton } from '../Favorites/FavoriteButton';

interface CountryCardProps {
    country: Country;
}

const CountryCard = ({ country }: CountryCardProps) => {
    const encodedName = encodeURIComponent(country.name.common);

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Link to={`/countries/${encodedName}`} style={{ textDecoration: 'none', flex: 1 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={country.flags.png}
                    alt={`Flag of ${country.name.common}`}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h6" component="div" color="text.primary">
                            {country.name.common}
                        </Typography>
                        <FavoriteButton
                            countryName={country.name.common}
                            country={country}
                            onFavoriteChange={(isFavorite) => {
                                // You can add any additional logic here when favorite status changes
                                console.log(`${country.name.common} is now ${isFavorite ? 'favorited' : 'unfavorited'}`);
                            }}
                        />
                    </Box>
                    <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Region:</strong> {country.region}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Population:</strong> {country.population.toLocaleString()}
                        </Typography>
                    </Box>
                </CardContent>
            </Link>
        </Card>
    );
};

export default CountryCard; 