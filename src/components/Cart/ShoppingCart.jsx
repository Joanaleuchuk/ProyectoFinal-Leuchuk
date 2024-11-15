// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/ShoppingCartContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; 

export const ShoppingCart = () => {
    const [cart, setCart] = useContext(CartContext);
    // eslint-disable-next-line no-unused-vars
    const [total, setTotal] = useState(0);
    const navigate = useNavigate(); 

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

    const handleCheckout = () => {
        if (cart.length > 0) {
            navigate("/checkout"); 
        } else {
            alert("El carrito está vacío. Agrega productos antes de realizar la compra.");
        }
    };

    return (
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
    );
};

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
