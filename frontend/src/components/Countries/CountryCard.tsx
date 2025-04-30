import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Country } from '../../types/country';

interface CountryCardProps {
    country: Country;
}

const CountryCard = ({ country }: CountryCardProps) => {
    const encodedName = encodeURIComponent(country.name.common);

    return (
        <Link to={`/countries/${encodedName}`} style={{ textDecoration: 'none' }}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={country.flags.png}
                    alt={`Flag of ${country.name.common}`}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                        {country.name.common}
                    </Typography>
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
            </Card>
        </Link>
    );
};

export default CountryCard; 