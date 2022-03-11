import reducer, { page } from './home';

describe('Testing pure functions home', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      statusHome: 'idle',
      results: [],
      currentPage: 'home',
    });
  });

  test('should handle a page being change currentPage to details', () => {
    const previousState = {
      statusHome: 'idle',
      results: [],
      currentPage: 'home',
    };
    expect(reducer(previousState, page('details'))).toEqual({
      statusHome: 'idle',
      results: [],
      currentPage: 'details',
    });
  });

  test('should handle a page being change currentPage to home', () => {
    const previousState = {
      statusHome: 'idle',
      results: [],
      currentPage: 'details',
    };
    expect(reducer(previousState, page('home'))).toEqual({
      statusHome: 'idle',
      results: [],
      currentPage: 'home',
    });
  });
});
