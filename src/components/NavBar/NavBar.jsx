/* eslint-disable no-unused-vars */
import React, { useState } from 'react'; 
import styled from 'styled-components';
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function NavBar({ showCartIcon = true }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <Nav>
      <TiendaMascota>
        <Link to={"/"}>
          <h2>La Masconeta</h2> 
        </Link>
      </TiendaMascota>
      {showCartIcon && (
        <Cart>
          <Link className="cart" to="/cart">
            <span> 
              🛒
            </span>
          </Link>
        </Cart>
      )}
    </Nav>
  );
}

export default NavBar;

// Estilos
const Nav = styled.nav`
  width: 100vw;
  height: 80px;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const TiendaMascota = styled.div`
  text-align: center;
  flex: 1;

  h2 {
    color: white;
    font-size: 24px;
    font-weight: bold;
    text-transform: uppercase;
    margin: 0;
  }
`;

const Cart = styled.div`
  display: flex;
  align-items: center;
  margin-right: 3rem;

  .cart span {
    background-color: grey;
    border-radius: 25%;
    padding: 0.1rem 0.3rem;
    color: white;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;