import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Info from './Info';

const WrapperHeader = styled.div`
  background: center/100% url('/world.svg') #4369b2 no-repeat;
  display: flex;
  flex-direction: column;
  border-bottom: 0.5px white solid;
  @media (min-width: 600px) {
    font-size: 1.2rem;
  }
  @media (min-width: 1020px) {
    font-size: 1.5rem;
  }
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 2em;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
  animation-name: down;
  animation-duration: 2s;
  @keyframes down {
    from {
      margin-bottom: 100%;
    }
    to {
      margin-bottom: 0;
    }
  }
`;

const Title = styled.div`
  flex: 1;
  padding: 1em 2em;
  margin: 0;
  text-shadow: 1px 2px 1px black;
  animation-name: entry;
  animation-duration: 6s;
  @keyframes entry {
    from {
      margin-left: 100%;
    }
    to {
      margin-left: 0;
    }
  }
`;

const Header = (props) => {
  const { data } = props;
  return (
    <WrapperHeader>
      <Title>
        <h1 style={{ textAlign: 'right' }}>{data.name}</h1>
      </Title>
      <MainContainer>
        <Info
          style={{
            textAlign: 'center',
          }}
        >
          <p style={{ fontWeight: 'bold' }}>Totals</p>
          <p>{`Confirmed: ${data.confirmed}`}</p>
          <p>{`Open Cases: ${data.openCases}`}</p>
          <p>{`Recovered: ${data.recovered}`}</p>
          <p>{`Deaths: ${data.deaths}`}</p>
        </Info>
        <Info
          style={{
            textAlign: 'center',
          }}
        >
          <p style={{ fontWeight: 'bold' }}>{`Day: ${data.day}`}</p>
          <p>{`Confirmed: ${data.todayConfirmed}`}</p>
          <p>{`Open Cases: ${data.todayOpenCases}`}</p>
          <p>{`Recovered: ${data.todayRecovered}`}</p>
          <p>{`Deaths: ${data.todayDeaths}`}</p>
        </Info>
      </MainContainer>
    </WrapperHeader>
  );
};

Header.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    day: PropTypes.string,
    confirmed: PropTypes.number,
    openCases: PropTypes.number,
    recovered: PropTypes.number,
    deaths: PropTypes.number,
    todayConfirmed: PropTypes.number,
    todayOpenCases: PropTypes.number,
    todayRecovered: PropTypes.number,
    todayDeaths: PropTypes.number,
  }).isRequired,
};

export default Header;
