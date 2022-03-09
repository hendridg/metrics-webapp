import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  statusHome: 'idle',
  results: [],
  currentPage: 'home',
};

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
  reducers: {
    page: (state, action) => ({
      ...state,
      currentPage: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiByDate.pending, (state) => ({
        ...state,
        statusHome: 'loading',
      }))
      .addCase(fetchApiByDate.fulfilled, (state, action) => {
        const day = Object.keys(action.payload.dates);
        const {
          date: dayTotal,
          today_confirmed: confirmed,
          today_open_cases: openCases,
          today_recovered: recovered,
          today_deaths: deaths,
          today_new_confirmed: todayConfirmed,
          today_new_open_cases: todayOpenCases,
          today_new_recovered: todayRecovered,
          today_new_deaths: todayDeaths,
        } = action.payload.total;
        const { countries } = action.payload.dates[day];
        const countryKeyArray = Object.keys(countries);
        const countriesArray = countryKeyArray.map((country) => {
          const obj = {
            id: countries[country].id,
            name: countries[country].name,
            link: countries[country].links[0].href,
            day: day[0],
            confirmed: countries[country].today_new_confirmed,
            openCases: countries[country].today_new_open_cases,
            recovered: countries[country].today_new_recovered,
            deaths: countries[country].today_new_deaths,
          };
          return obj;
        });
        countriesArray.sort((a, b) => b.confirmed - a.confirmed);
        return {
          ...state,
          statusHome: 'done',
          results: countriesArray,
          totalWorld: {
            name: 'World',
            day: dayTotal,
            confirmed,
            openCases,
            recovered,
            deaths,
            todayConfirmed,
            todayOpenCases,
            todayRecovered,
            todayDeaths,
          },
        };
      });
  },
});

export const selectResults = (state) => state.home.results;
export const selectStatusHome = (state) => state.home.statusHome;
export const selectTotalWorld = (state) => state.home.totalWorld;
export const selectPageState = (state) => state.home.currentPage;

export const { page } = homeSlice.actions;

export default homeSlice.reducer;
