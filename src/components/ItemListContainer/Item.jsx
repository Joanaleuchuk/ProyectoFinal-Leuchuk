/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'; 
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/ShoppingCartContext';

export const Item = ({ name, price, id, imgUrl }) => {
  const [cart, setCart] = useContext(CartContext);
  const navigate = useNavigate();

  const addToCart = () => {
    setCart((cartItems) => {
      const isItemFound = cartItems.find((item) => item.id === id);
      const validImgUrl = imgUrl || '/path/to/default-image.jpg'; 

      if (isItemFound) {
        return cartItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1, image: validImgUrl }; 
          } else {
            return item;
          }
        });
      } else {
        return [...cartItems, { id, quantity: 1, price, image: validImgUrl }];
      }
    });
  };

  const removeItem = () => {
    setCart((cartItems) => {
      const item = cartItems.find((item) => item.id === id);
      if (item?.quantity === 1) {
        return cartItems.filter((item) => item.id !== id);
      } else {
        return cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const validImgUrl = imgUrl || '/path/to/default-image.jpg'; 

  return (
    <ItemContainer>
      {/* La ruta de la imagen debe estar correctamente definida */}
      <Image src={validImgUrl} alt={name} onClick={() => navigate(`shop/${id}`)} /> 
      <Info>
        <h2>{name}</h2>
        <p>{price} $</p>
      </Info>
      <Actions>
        <button onClick={addToCart}>+</button>
        <span>{cart.find(item => item.id === id)?.quantity || 0}</span>
        <button onClick={removeItem}>-</button>
        <button onClick={() => navigate(`/cart`)}>Comprar</button>
      </Actions>
    </ItemContainer>
  );
};

Item.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  imgUrl: PropTypes.string, // Ahora imgUrl no es obligatorio
};

export default Item;


const ItemContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer; /* Indicamos que es clicable */
`;

const Info = styled.div`
  h2 {
    font-size: 1.5rem;
    margin: 0;
    color: #333;
  }

  p {
    font-size: 1rem;
    margin: 0.5rem 0;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
  }
`;
