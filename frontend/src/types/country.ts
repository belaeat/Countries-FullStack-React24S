export interface CountryName {
  common: string;
  official: string;
  nativeName?: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
}

export interface CountryFlags {
  png: string;
  svg: string;
  alt?: string;
}

export interface Country {
  name: CountryName;
  flags: CountryFlags;
  region: string;
  subregion?: string;
  capital?: string[];
  population: number;
  area: number;
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages?: {
    [key: string]: string;
  };
  borders?: string[];
  cca3: string;
}

export interface CountryState {
  countries: Country[];
  selectedCountry: Country | null;
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
    region: string;
    subregion: string;
    population: string;
    area: string;
    capital: string;
    currency: string;
  };
}
