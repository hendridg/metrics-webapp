import PropTypes from 'prop-types';
import styled from 'styled-components';
import Info from './Info';

const CardDetails = styled.div`
  background: linear-gradient(
    to bottom right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.6)
  );
  background-color: #4369b2;
  width: 8rem;
  padding: 0.5rem 1rem;
  border-radius: 0.2rem;
`;
const Card = (props) => {
  const { data } = props;
  return (
    <CardDetails>
      <Info>
        <p
          style={{
            textAlign: 'right',
            fontWeight: 'bold',
            lineHeight: 'normal',
            margin: '0',
          }}
        >
          {`${data.name}`}
        </p>
        <p>{`Confirmed: ${data.confirmed}`}</p>
        <p>{`Open Cases: ${data.openCases}`}</p>
        <p>{`Recovered: ${data.recovered}`}</p>
        <p style={{ margin: '0' }}>{`Deaths: ${data.deaths}`}</p>
      </Info>
    </CardDetails>
  );
};

Card.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    confirmed: PropTypes.number,
    openCases: PropTypes.number,
    recovered: PropTypes.number,
    deaths: PropTypes.number,
  }).isRequired,
};

export default Card;
