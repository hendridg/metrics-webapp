import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectResults } from '../redux/home/home';
import { today } from '../utils';

const Home = () => {
  const countries = useSelector(selectResults);
  const [date, setDate] = useState('');
  const [maxDate, setMaxDate] = useState('hello');
  useEffect(() => {
    setMaxDate(today().slice(1));
  }, []);

  return (
    <div>
      <h1>Hello from App!</h1>
      {maxDate !== 'hello' && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log('marcado:', date);
          }}
        >
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
          <button type="submit">Submit</button>
        </form>
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
