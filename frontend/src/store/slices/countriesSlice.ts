import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Country } from '../../types/country';

interface CountriesState {
  countries: Country[];
  loading: boolean;
  error: string | null;
}

const initialState: CountriesState = {
  countries: [],
  loading: false,
  error: null,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<Country[]>) => {
      state.countries = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setCountries, setLoading, setError } = countriesSlice.actions;
export default countriesSlice.reducer;
