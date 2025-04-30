import { Box, Typography, Grid } from '@mui/material';
import { WeatherData } from '../../types/weather';

interface WeatherInfoProps {
    data: WeatherData;
}

const WeatherInfo = ({ data }: WeatherInfoProps) => {
    const { main, weather, wind } = data;
    const weatherCondition = weather[0];

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <img
                            src={`https://openweathermap.org/img/wn/${weatherCondition.icon}@2x.png`}
                            alt={weatherCondition.description}
                        />
                        <Typography variant="h4">
                            {Math.round(main.temp)}°C
                        </Typography>
                    </Box>
                    <Typography variant="h6" color="text.secondary">
                        {weatherCondition.description}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1">
                        <strong>Feels like:</strong> {Math.round(main.feels_like)}°C
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1">
                        <strong>Humidity:</strong> {main.humidity}%
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1">
                        <strong>Wind Speed:</strong> {wind.speed} m/s
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default WeatherInfo; 