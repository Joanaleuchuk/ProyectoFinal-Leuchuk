// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/ShoppingCartContext";
import NavBar from "../NavBar/NavBar";
import styled from "styled-components";
import Swal from "sweetalert2";
import { db } from "../../firebase/Firebase"; 
import { addDoc, collection, Timestamp } from "firebase/firestore";

export const ShoppingCart = () => {
  const [cart, setCart] = useContext(CartContext);
  const [total, setTotal] = useState(0);

  
  useEffect(() => {
    const calculateTotal = () => {
      const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotal(totalAmount);
    };
    calculateTotal();
  }, [cart]);

  const increaseQuantity = (id) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (id) => {
    setCart(cart.map(item => 
      item.id === id && item.quantity > 1 
      ? { ...item, quantity: item.quantity - 1 } 
      : item
    ));
  };

  const removeProduct = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const registerPurchase = async () => {
    console.log("Contenido del carrito:", cart); 
    const validItems = cart
      .filter(item => item.id && item.name && item.quantity && item.price)
      .map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

    console.log("Productos válidos:", validItems); 

    if (validItems.length === 0) {
      Swal.fire("Error", "No se encontraron productos válidos para la compra.", "error");
      return;
    }

    const purchaseData = {
      items: validItems,
      total: total,
      date: Timestamp.fromDate(new Date())
    };

    try {
      await addDoc(collection(db, "purchases"), purchaseData);
      Swal.fire("Gracias por tu compra", "Tu pedido ha sido registrado", "success");
      setCart([]); 
    } catch (error) {
      console.error("Error registrando la compra: ", error);
      Swal.fire("Error", "No se pudo registrar tu compra. Intenta nuevamente.", "error");
    }
  };
  const handleCheckout = () => {
    if (cart.length > 0) {
      registerPurchase();
    } else {
      Swal.fire("Carrito vacío", "Agrega productos antes de realizar la compra.", "warning");
    }
  };

  return (
    <>
      <NavBar showCartIcon={true} />
      <ShoppingCartContainer>
        {cart.length > 0 ? (
          <div>
            {cart.map((product) => (
              <CartItem key={product.id}>
                <CartImage src={product.image} alt="product cart" />
                <CartDetails>
                  <Name>{product.name}</Name>
                  <Price>{product.price}$</Price>
                  <Quantity>Cantidad: {product.quantity}</Quantity>
                </CartDetails>
                <CartActions>
                  <QuantityButton onClick={() => decreaseQuantity(product.id)}>-</QuantityButton>
                  <QuantityButton onClick={() => increaseQuantity(product.id)}>+</QuantityButton>
                  <RemoveButton onClick={() => removeProduct(product.id)}>🗑️</RemoveButton>
                </CartActions>
              </CartItem>
            ))}
            <TotalContainer>Total: {total}$</TotalContainer>
            <CheckoutButton onClick={handleCheckout}>Iniciar compra</CheckoutButton>
          </div>
        ) : (
          <p>El carrito está vacío.</p>
        )}
      </ShoppingCartContainer>
    </>
  );
};

// Estilos
const ShoppingCartContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: auto;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
`;

const CartImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 15px;
`;

const CartDetails = styled.div`
  flex-grow: 1;
`;

const Name = styled.h3`
  margin: 0;
`;

const Price = styled.p`
  margin: 0;
`;

const Quantity = styled.p`
  margin: 0;
`;

const CartActions = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 5px;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 5px;
`;

const CheckoutButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #28a745;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;

const TotalContainer = styled.div`
  text-align: center;
  font-size: 18px;
  margin-top: 15px;
`;
