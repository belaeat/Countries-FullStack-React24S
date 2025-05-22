export interface CountryFavorite {
  id: string;
  created_at: string;
  country_name: string;
  country_code: string;
  country_flag: string;
  user_id: string;
  region?: string;
  capital?: string;
  population?: number;
}

export interface FavoritesState {
  favorites: CountryFavorite[];
  loading: boolean;
  error: string | null;
}
