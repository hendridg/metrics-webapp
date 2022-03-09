import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiByDate, selectPageState, page } from '../redux/home/home';

import { BASE_URL, today } from '../utils';

const NavBar = styled.div`
  background-color: #4369b2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5em;
  border-bottom: 0.5px white solid;
  > p {
    margin: 0.5em;
  }
  @media (min-width: 600px) {
    justify-content: space-around;
    font-size: 1.2rem;
  }
  @media (min-width: 900px) {
    justify-content: space-around;
    font-size: 1.5rem;
  }
`;

const Navigation = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState('');
  const currentPage = useSelector(selectPageState);

  useEffect(() => {
    setDate(today());
  }, []);

  useEffect(() => {
    if (date !== '' && currentPage === 'home') {
      dispatch(fetchApiByDate(`${BASE_URL}${date}`));
    }
  }, [date]);
  const navitage = useNavigate();
  const [selectFilter, setselectFilter] = useState(false);
  return (
    <NavBar>
      {currentPage === 'home' ? (
        <p>2022</p>
      ) : (
        <button
          style={{ background: 'none', border: 'none' }}
          type="button"
          onClick={() => {
            dispatch(page('home'));
            navitage('/');
          }}
        >
          <img src="/arrow-left.svg" alt="back" style={{ width: '2em' }} />
        </button>
      )}
      {selectFilter || date !== today() ? (
        <p>{`Covid/${date}`}</p>
      ) : (
        <p>COVID/today</p>
      )}
      {date !== '' && selectFilter === true && (
        <input
          id="start"
          type="date"
          value={date}
          min="2020-01-01"
          max={today()}
          onChange={({ target }) => {
            setDate(target.value);
            setselectFilter(false);
          }}
        />
      )}
      {currentPage === 'home' && (
        <button
          style={{ background: 'none', border: 'none' }}
          type="button"
          onClick={() => setselectFilter(!selectFilter)}
        >
          <img src="/filter-solid.svg" alt="back" style={{ width: '1.2em' }} />
        </button>
      )}
    </NavBar>
  );
};

export default Navigation;
