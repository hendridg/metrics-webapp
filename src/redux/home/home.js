import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  statusHome: 'idle',
  results: [],
};

export const fetchApiByCountries = createAsyncThunk(
  'home/fetchApiByCountries',
  async (url) => {
    const response = await fetch(url).then((res) => res.json());
    return response;
  },
);

export const fetchApiByDate = createAsyncThunk(
  'home/fetchApiByDate',
  async (url) => {
    const response = await fetch(url).then((res) => res.json());
    return response;
  },
);

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiByCountries.pending, (state) => ({
        ...state,
        statusHome: 'loading',
      }))
      .addCase(fetchApiByCountries.fulfilled, (state, action) => {
        const arrayHome = action.payload.countries.map((country) => ({
          id: country.id,
          name: country.name,
          link: country.links[0].href,
        }));
        return {
          ...state,
          statusHome: 'done',
          results: arrayHome,
        };
      })
      .addCase(fetchApiByDate.pending, (state) => ({
        ...state,
        statusHome: 'loading',
      }))
      .addCase(fetchApiByDate.fulfilled, (state, action) => {
        const day = Object.keys(action.payload.dates);
        const { countries } = action.payload.dates[day];
        const countryKeyArray = Object.keys(countries);
        const countriesArray = countryKeyArray.map((country) => {
          const obj = {
            id: countries[country].id,
            name: countries[country].name,
            link: countries[country].links[0].href,
            todayCases: countries[country].today_new_confirmed,
            day,
          };
          return obj;
        });
        countriesArray.sort((a, b) => b.todayCases - a.todayCases);
        return {
          ...state,
          statusHome: 'done',
          results: countriesArray,
        };
      });
  },
});

export const selectResults = (state) => state.home.results;
export const selectStatusHome = (state) => state.home.statusHome;

export default homeSlice.reducer;
