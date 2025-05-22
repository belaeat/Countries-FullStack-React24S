import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCountries, setLoading, setError } from '../../store/slices/countriesSlice';
import { countriesApi } from '../../api/services/countries';
import {
    Grid,
    Box,
    Typography,
    CircularProgress,
    Pagination,
    SelectChangeEvent,
    Container
} from '@mui/material';
import CountryCard from './CountryCard';
import CountriesToolbar from './CountriesToolbar';


const ITEMS_PER_PAGE = 12;

type FilterKey = 'region' | 'subregion' | 'population' | 'area' | 'capital' | 'currency';

const CountriesList = () => {
    const dispatch = useAppDispatch();
    const { countries, loading, error } = useAppSelector((state) => state.countries);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<Record<FilterKey, string>>({
        region: '',
        subregion: '',
        population: '',
        area: '',
        capital: '',
        currency: '',
    });
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                dispatch(setLoading(true));
                const data = await countriesApi.getAllCountries();
                // Sort countries alphabetically by name
                const sortedData = [...data].sort((a, b) =>
                    a.name.common.localeCompare(b.name.common)
                );
                dispatch(setCountries(sortedData));
            } catch {
                dispatch(setError('Failed to fetch countries'));
            }
        };

        fetchCountries();
    }, [dispatch]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleFilterChange = (filter: FilterKey) => (event: SelectChangeEvent) => {
        setFilters({ ...filters, [filter]: event.target.value });
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setFilters({
            region: '',
            subregion: '',
            population: '',
            area: '',
            capital: '',
            currency: '',
        });
        setSearchTerm('');
        setCurrentPage(1);
    };

    const filteredCountries = countries.filter(country => {
        const matchesSearch = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRegion = !filters.region || country.region === filters.region;
        const matchesSubregion = !filters.subregion || country.subregion === filters.subregion;
        const matchesPopulation = !filters.population ||
            (filters.population === 'Less than 1M' && country.population < 1000000) ||
            (filters.population === '1M - 10M' && country.population >= 1000000 && country.population < 10000000) ||
            (filters.population === '10M - 100M' && country.population >= 10000000 && country.population < 100000000) ||
            (filters.population === 'More than 100M' && country.population >= 100000000);
        const matchesArea = !filters.area ||
            (filters.area === 'Less than 1K km²' && country.area < 1000) ||
            (filters.area === '1K - 10K km²' && country.area >= 1000 && country.area < 10000) ||
            (filters.area === '10K - 100K km²' && country.area >= 10000 && country.area < 100000) ||
            (filters.area === '100K - 1M km²' && country.area >= 100000 && country.area < 1000000) ||
            (filters.area === 'More than 1M km²' && country.area >= 1000000);
        const matchesCapital = !filters.capital ||
            country.capital?.some(cap => cap.toLowerCase().includes(filters.capital.toLowerCase()));
        const matchesCurrency = !filters.currency ||
            (country.currencies && Object.keys(country.currencies).includes(filters.currency));

        return matchesSearch && matchesRegion && matchesSubregion &&
            matchesPopulation && matchesArea && matchesCapital && matchesCurrency;
    });

    const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentCountries = filteredCountries.slice(startIndex, endIndex);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ flexGrow: 1 }}>
                <CountriesToolbar
                    searchTerm={searchTerm}
                    filters={filters}
                    countries={countries}
                    onSearchChange={handleSearch}
                    onFilterChange={handleFilterChange}
                    onClearFilters={clearFilters}
                />

                <Grid container spacing={3}>
                    {currentCountries.map((country) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={country.cca3}>
                            <CountryCard country={country} />
                        </Grid>
                    ))}
                </Grid>

                {totalPages > 1 && (
                    <Box display="flex" justifyContent="center" mt={4} mb={2}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default CountriesList; 