// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function NotFound() {
  return (
    <NotFoundContainer>
      <h1>404</h1>
      <p>¡Ups! La página que buscas no existe.</p>
      <Link to="/shop">Volver a la tienda</Link>
    </NotFoundContainer>
  );
}

export default NotFound;

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f8f8f8;

  h1 {
    font-size: 6rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  a {
    color: #3498db;
    text-decoration: none;
    font-size: 1.2rem;
    margin-top: 1rem;
    border: 1px solid #3498db;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #3498db;
      color: white;
    }
  }
`;
