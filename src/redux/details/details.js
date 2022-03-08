import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  statusDetails: 'idle',
  resultsDetails: [],
  nameCountry: '',
  countryTotalDeaths: '',
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
        const countryName = Object.keys(action.payload.dates[day].countries);
        const regionsArray = action.payload.dates[day].countries[
          countryName
        ].regions.map((region) => ({
          name: region.name,
          todayDeaths: region.today_deaths,
          todayNewDeaths: region.today_new_deaths,
        }));
        // console.log(
        //   Object.keys(action.payload.dates[day].countries[countryName].regions),
        // );
        return {
          ...state,
          statusDetails: 'done',
          resultsDetails: regionsArray,
          nameCountry: action.payload.dates[day].countries[countryName].name,
          countryTotalDeaths:
            action.payload.dates[day].countries[countryName].today_deaths,
        };
      });
  },
});

export const selectResultsDetails = (state) => state.details.resultsDetails;
export const selectNameCountry = (state) => state.details.nameCountry;
// prettier-ignore
export const selectCountryTotalDeaths = (state) => state.details.countryTotalDeaths;

export default detailsSlice.reducer;
