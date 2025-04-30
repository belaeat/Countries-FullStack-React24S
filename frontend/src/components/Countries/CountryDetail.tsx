import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCountries, setLoading, setError } from '../../store/slices/countriesSlice';
import { fetchWeather } from '../../store/slices/weatherSlice';
import { countriesApi } from '../../api/services/countries';
import { Box, Typography, Button, Grid, Paper, CircularProgress } from '@mui/material';
import WeatherInfo from '../Weather/WeatherInfo';

const CountryDetail = () => {
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { countries, loading, error } = useAppSelector((state) => state.countries);
    const { data: weatherData, loading: weatherLoading } = useAppSelector((state) => state.weather);

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                dispatch(setLoading(true));
                const data = await countriesApi.getAllCountries();
                dispatch(setCountries(data));
            } catch {
                dispatch(setError('Failed to fetch country'));
            }
        };

        fetchCountry();
    }, [dispatch]);

    const country = countries.find(
        (c) => c.name.common.toLowerCase() === decodeURIComponent(name || '').toLowerCase()
    );

    useEffect(() => {
        if (country?.capital?.[0]) {
            dispatch(fetchWeather(country.capital[0]));
        }
    }, [country, dispatch]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error || !country) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <Typography color="error">{error || 'Country not found'}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Button
                variant="outlined"
                onClick={() => navigate('/countries')}
                sx={{ mb: 3 }}
            >
                Back to Countries
            </Button>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h4" gutterBottom>
                            {country.name.common}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            {country.name.official}
                        </Typography>
                        <img
                            src={country.flags.png}
                            alt={`Flag of ${country.name.common}`}
                            style={{ maxWidth: '100%', marginBottom: '1rem' }}
                        />
                        <Typography variant="body1" paragraph>
                            <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>Region:</strong> {country.region}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>Subregion:</strong> {country.subregion || 'N/A'}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>Population:</strong> {country.population.toLocaleString()}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>Area:</strong> {country.area.toLocaleString()} km²
                        </Typography>
                        {country.currencies && (
                            <Typography variant="body1" paragraph>
                                <strong>Currencies:</strong>{' '}
                                {Object.values(country.currencies)
                                    .map((currency) => `${currency.name} (${currency.symbol})`)
                                    .join(', ')}
                            </Typography>
                        )}
                        {country.languages && (
                            <Typography variant="body1" paragraph>
                                <strong>Languages:</strong>{' '}
                                {Object.values(country.languages).join(', ')}
                            </Typography>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    {country.capital?.[0] && (
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h5" gutterBottom>
                                Weather in {country.capital[0]}
                            </Typography>
                            {weatherLoading ? (
                                <CircularProgress />
                            ) : (
                                weatherData && <WeatherInfo data={weatherData} />
                            )}
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default CountryDetail; 