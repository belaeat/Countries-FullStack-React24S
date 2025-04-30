import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Toolbar,
    Paper,
    SelectChangeEvent
} from '@mui/material';
import { Country } from '../../types/country';

type FilterKey = 'region' | 'subregion' | 'population' | 'area' | 'capital' | 'currency';

interface CountriesToolbarProps {
    searchTerm: string;
    filters: Record<FilterKey, string>;
    countries: Country[];
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFilterChange: (filter: FilterKey) => (event: SelectChangeEvent) => void;
    onClearFilters: () => void;
}

const CountriesToolbar = ({
    searchTerm,
    filters,
    countries,
    onSearchChange,
    onFilterChange,
    onClearFilters
}: CountriesToolbarProps) => {
    const getUniqueValues = (key: FilterKey) => {
        const values = countries.map(country => {
            if (key === 'population') {
                const pop = country.population;
                if (pop < 1000000) return 'Less than 1M';
                if (pop < 10000000) return '1M - 10M';
                if (pop < 100000000) return '10M - 100M';
                return 'More than 100M';
            }
            if (key === 'area') {
                const area = country.area;
                if (area < 1000) return 'Less than 1K km²';
                if (area < 10000) return '1K - 10K km²';
                if (area < 100000) return '10K - 100K km²';
                if (area < 1000000) return '100K - 1M km²';
                return 'More than 1M km²';
            }
            if (key === 'currency') {
                return country.currencies ? Object.keys(country.currencies)[0] : '';
            }
            if (key === 'capital') {
                return country.capital?.[0] || '';
            }
            if (key === 'region') {
                return country.region;
            }
            if (key === 'subregion') {
                return country.subregion;
            }
            return '';
        }).filter(value => value !== undefined && value !== '');
        return Array.from(new Set(values)).sort();
    };

    return (
        <Paper sx={{ mb: 2 }}>
            <Toolbar sx={{ flexWrap: 'wrap', gap: 2 }}>
                <TextField
                    label="Search Countries"
                    variant="outlined"
                    value={searchTerm}
                    onChange={onSearchChange}
                    size="small"
                />
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Region</InputLabel>
                    <Select
                        value={filters.region}
                        onChange={onFilterChange('region')}
                        label="Region"
                    >
                        <MenuItem value="">All Regions</MenuItem>
                        {getUniqueValues('region').map(region => (
                            <MenuItem key={region} value={region}>{region}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Subregion</InputLabel>
                    <Select
                        value={filters.subregion}
                        onChange={onFilterChange('subregion')}
                        label="Subregion"
                    >
                        <MenuItem value="">All Subregions</MenuItem>
                        {getUniqueValues('subregion').map(subregion => (
                            <MenuItem key={subregion} value={subregion}>{subregion}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Population</InputLabel>
                    <Select
                        value={filters.population}
                        onChange={onFilterChange('population')}
                        label="Population"
                    >
                        <MenuItem value="">All Populations</MenuItem>
                        <MenuItem value="Less than 1M">Less than 1M</MenuItem>
                        <MenuItem value="1M - 10M">1M - 10M</MenuItem>
                        <MenuItem value="10M - 100M">10M - 100M</MenuItem>
                        <MenuItem value="More than 100M">More than 100M</MenuItem>
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Area</InputLabel>
                    <Select
                        value={filters.area}
                        onChange={onFilterChange('area')}
                        label="Area"
                    >
                        <MenuItem value="">All Areas</MenuItem>
                        <MenuItem value="Less than 1K km²">Less than 1K km²</MenuItem>
                        <MenuItem value="1K - 10K km²">1K - 10K km²</MenuItem>
                        <MenuItem value="10K - 100K km²">10K - 100K km²</MenuItem>
                        <MenuItem value="100K - 1M km²">100K - 1M km²</MenuItem>
                        <MenuItem value="More than 1M km²">More than 1M km²</MenuItem>
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Capital</InputLabel>
                    <Select
                        value={filters.capital}
                        onChange={onFilterChange('capital')}
                        label="Capital"
                    >
                        <MenuItem value="">All Capitals</MenuItem>
                        {getUniqueValues('capital').map(capital => (
                            <MenuItem key={capital} value={capital}>{capital}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Currency</InputLabel>
                    <Select
                        value={filters.currency}
                        onChange={onFilterChange('currency')}
                        label="Currency"
                    >
                        <MenuItem value="">All Currencies</MenuItem>
                        {getUniqueValues('currency').map(currency => (
                            <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    variant="outlined"
                    onClick={onClearFilters}
                    size="small"
                >
                    Clear Filters
                </Button>
            </Toolbar>
        </Paper>
    );
};

export default CountriesToolbar; 