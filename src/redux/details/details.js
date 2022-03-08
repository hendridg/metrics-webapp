import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  statusDetails: 'idle',
  resultsRegionsDetails: [],
  totalCountry: {},
};

export const fetchApiDetails = createAsyncThunk(
  'details/fetchApiDetails',
  async (url) => {
    const response = await fetch(url).then((res) => res.json());
    return response;
  },
);

const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiDetails.pending, (state) => ({
        ...state,
        statusDetails: 'loading',
      }))
      .addCase(fetchApiDetails.fulfilled, (state, action) => {
        const day = Object.keys(action.payload.dates);
        if (Object.keys(action.payload.dates[day].countries).length === 0) {
          return {
            ...state,
            statusDetails: 'done',
            resultsRegionsDetails: [],
            totalCountry: {
              day: day[0],
              name: 'no data',
              confirmed: 'no data',
              openCases: 'no data',
              recovered: 'no data',
              deaths: 'no data',
              todayConfirmed: 'no data',
              todayOpenCases: 'no data',
              todayRecovered: 'no data',
              todayDeaths: 'no data',
            },
          };
        }
        const countryName = Object.keys(action.payload.dates[day].countries);
        const {
          name,
          today_confirmed: confirmed,
          today_open_cases: openCases,
          today_recovered: recovered,
          today_deaths: deaths,
          today_new_confirmed: todayConfirmed,
          today_new_open_cases: todayOpenCases,
          today_new_recovered: todayRecovered,
          today_new_deaths: todayDeaths,
        } = action.payload.dates[day].countries[countryName];
        const regionsArray = action.payload.dates[day].countries[
          countryName
        ].regions.map((region) => ({
          id: region.id,
          name: region.name,
          day: day[0],
          confirmed: region.today_new_confirmed,
          openCases: region.today_new_open_cases,
          recovered: region.today_new_recovered,
          deaths: region.today_new_deaths,
        }));
        return {
          ...state,
          statusDetails: 'done',
          resultsRegionsDetails: regionsArray,
          totalCountry: {
            day: day[0],
            name,
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

// prettier-ignore
export const selectResultsRegionsDetails = (state) => state.details.resultsRegionsDetails;
export const selectNameCountry = (state) => state.details.nameCountry;
export const selectStatusDetails = (state) => state.details.statusDetails;
// prettier-ignore
export const selectTotalCountry = (state) => state.details.totalCountry;

export default detailsSlice.reducer;
