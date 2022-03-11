import reducer from './details';

describe('Testing pure functions details', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      statusDetails: 'idle',
      resultsRegionsDetails: [],
      totalCountry: {},
    });
  });
});
