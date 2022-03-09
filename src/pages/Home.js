import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectResults,
  selectTotalWorld,
  selectStatusHome,
} from '../redux/home/home';
import Header from '../components/Header';
import CardContainer from '../components/CardContainer';
import Card from '../components/Card';
import Loading from '../components/Loading';

const LinkTo = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 0;
`;

const Home = () => {
  const countries = useSelector(selectResults);
  const totalWorld = useSelector(selectTotalWorld);
  const status = useSelector(selectStatusHome);

  if (status === 'loading' || status === 'idle') return <Loading />;

  return (
    <div>
      <Header data={totalWorld} />
      <CardContainer>
        {countries.map((country) => (
          <LinkTo to={`${country.id}/${country.day}`} key={country.id}>
            <Card data={country} style={{ margin: '0' }} />
          </LinkTo>
        ))}
      </CardContainer>
    </div>
  );
};

export default Home;
