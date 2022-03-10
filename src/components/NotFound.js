import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import NoDataAvaible from './NoDataAvaible';

const Message = styled.div`
  background: white;
  color: rgba(0, 0, 0, 0.87);
  max-width: 300px;
  margin: 100px auto 16px;
  padding: 32px 24px 16px;
  border-radius: 3px;
  h2 {
    color: #ffa100;
    font-weight: bold;
    font-size: 16px;
    margin: 0 0 8px;
  }
  h1 {
    font-size: 22px;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.6);
    margin: 0 0 16px;
  }
  p {
    line-height: 140%;
    margin: 16px 0 24px;
    font-size: 14px;
  }
  button {
    color: #ffa100;
    border: 1px solid #ffa100;
    font-weight: bold;
    padding: 0.3em 1.5em;
  }
`;
const NotFound = () => {
  const navitage = useNavigate();
  return (
    <div>
      <Message>
        <h2>404</h2>
        <h1>Page Not Found</h1>
        <p>
          The specified file was not found on this website. Please check the URL
          for mistakes and try again.
        </p>
        <button type="button" onClick={() => navitage('/')}>
          Back
        </button>
      </Message>
      <NoDataAvaible />
    </div>
  );
};
export default NotFound;
