import { rest } from 'msw';
import { setupServer } from 'msw/node';
import render, { screen } from './test-utils';
import App from '../App';
import { BASE_URL, today } from '../utils';

const handlers = [
  rest.get(`${BASE_URL}${today()}`, (req, res, ctx) => res(
    ctx.json({
      dates: {
        '2022-03-11': {
          countries: {
            Afghanistan: {
              date: today(),
              id: 'afghanistan',
              links: [
                {
                  href: '/api/2022-03-11/country/afghanistan',
                  rel: 'self',
                  type: 'GET',
                },
              ],
              name: 'Afghanistan',
              name_es: 'Afganist\u00e1n',
              name_it: 'afghanistan',
              regions: [],
              source: 'John Hopkins University',
              today_confirmed: 175974,
              today_deaths: 7640,
              today_new_confirmed: 81,
              today_new_deaths: 1,
              today_new_open_cases: 80,
              today_new_recovered: 0,
              today_open_cases: 85748,
              today_recovered: 82586,
              today_vs_yesterday_confirmed: 0.00046050724019708333,
              today_vs_yesterday_deaths: 0.00013090718680452973,
              today_vs_yesterday_open_cases: 0.0009338376056404751,
              today_vs_yesterday_recovered: 0.0,
              yesterday_confirmed: 175893,
              yesterday_deaths: 7639,
              yesterday_open_cases: 85668,
              yesterday_recovered: 82586,
            },
            Venezuela: {
              date: '2022-03-11',
              id: 'venezuela',
              links: [
                {
                  href: '/api/2022-03-11/country/venezuela',
                  rel: 'self',
                  type: 'GET',
                },
              ],
              name: 'Venezuela',
              name_es: 'Venezuela',
              name_it: 'Venezuela',
              regions: [],
              source: 'John Hopkins University',
              today_confirmed: 517720,
              today_deaths: 5655,
              today_new_confirmed: 0,
              today_new_deaths: 0,
              today_new_open_cases: 0,
              today_new_recovered: 0,
              today_open_cases: 217458,
              today_recovered: 294607,
              today_vs_yesterday_confirmed: 0.0,
              today_vs_yesterday_deaths: 0.0,
              today_vs_yesterday_open_cases: 0.0,
              today_vs_yesterday_recovered: 0.0,
              yesterday_confirmed: 517720,
              yesterday_deaths: 5655,
              yesterday_open_cases: 217458,
              yesterday_recovered: 294607,
            },
            info: {
              date: '2022-03-11 00:00CET',
              date_generation: '2022-03-11 21:12',
              yesterday: '2022-03-10 00:00CET',
            },
          },
        },
      },
      metadata: {
        by: 'Narrativa & AppliedXL',
        url: ['wwww.narrativa.com', 'www.appliedxl.com'],
      },
      total: {
        date: '2022-03-11',
        name: 'Total',
        name_es: 'Total',
        name_it: 'Total',
        rid: '#total',
        source: 'Narrativa',
        today_confirmed: 454222834,
        today_deaths: 6033594,
        today_new_confirmed: 1694168,
        today_new_deaths: 8137,
        today_new_open_cases: 1630721,
        today_new_recovered: 55310,
        today_open_cases: 294572523,
        today_recovered: 153616717,
        today_vs_yesterday_confirmed: 0.0037437805100284383,
        today_vs_yesterday_deaths: 0.001350436987601178,
        today_vs_yesterday_open_cases: 0.005566706386273879,
        today_vs_yesterday_recovered: 0.00036018164381634854,
        yesterday_confirmed: 452528666,
        yesterday_deaths: 6025457,
        yesterday_open_cases: 292941802,
        yesterday_recovered: 153561407,
      },
      updated_at: '2022-03-11 20:12UTC',
    }),
    ctx.delay(150),
  )),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Should be show to card Elements, Afghanistan & Venezuela', () => {
  test('Shoul be render Venezuela <Card /> element', async () => {
    render(<App />);
    const cardElement = await screen.findByText('Afghanistan');
    expect(cardElement.textContent).toEqual('Afghanistan');
  });
  test('Shoul be render Venezuela <Card /> element', async () => {
    render(<App />);
    const cardElement = await screen.findByText('Venezuela');
    expect(cardElement.textContent).toEqual('Venezuela');
  });
});
