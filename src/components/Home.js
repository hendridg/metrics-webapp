import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchApiByDate, selectResults } from '../redux/home/home';
import { BASE_URL, today } from '../utils';

const Home = () => {
  const [date, setDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [selectToday, setselectToday] = useState('');
  const countries = useSelector(selectResults);
  const dispatch = useDispatch();

  useEffect(() => {
    setselectToday(today());
  }, []);

  useEffect(() => {
    if (selectToday !== '') {
      dispatch(fetchApiByDate(`${BASE_URL}${selectToday}`));
    }
    setMaxDate(selectToday);
  }, [selectToday]);

  useEffect(() => {
    if (date !== '') {
      dispatch(fetchApiByDate(`${BASE_URL}${date}`));
    }
  }, [date]);

  return (
    <div>
      {maxDate !== '' && (
        <label htmlFor="start">
          Date:
          <input
            id="start"
            type="date"
            value={date}
            min="2020-01-01"
            max={maxDate}
            onChange={({ target }) => setDate(target.value)}
          />
        </label>
      )}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.5rem',
        }}
      >
        {countries ? (
          countries.map((country) => (
            <Link to={`${country.id}/${country.day}`} key={country.id}>
              <div
                style={{
                  border: 'solid 1px black',
                  padding: '1rem',
                  width: '5rem',
                  height: '6rem',
                }}
              >
                <p>{country.name}</p>
                {country.todayCases && <p>{country.todayCases}</p>}
              </div>
            </Link>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
