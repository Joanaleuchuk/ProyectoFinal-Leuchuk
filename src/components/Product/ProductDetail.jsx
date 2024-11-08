/* eslint-disable no-unused-vars */
// src/components/Product/ProductDetail.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import styled from "styled-components";
import { CartContext } from "../../Context/ShoppingCartContext";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [cart, setCart] = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          navigate("*");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId, navigate]);

  const addToCart = (product) => {
    if (!product) return;
    setCart((cartItems) => {
      const isItemFound = cartItems.find((item) => item.id === product.id);
      if (isItemFound) {
        return cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...cartItems, { ...product, quantity: 1 }];
      }
    });
  };

  if (loading) return <p>Cargando producto...</p>;

  return (
    product && (
      <DetailContainer>
        <img src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Precio: ${product.price.toLocaleString()}</p>
        <button onClick={() => addToCart(product)}>Comprar</button>
      </DetailContainer>
    )
  );
}

export default ProductDetail;

const DetailContainer = styled.div`
  padding: 2rem;
  text-align: center;

  img {
    max-width: 100%;
    height: auto;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 2rem;
    margin: 1rem 0;
  }

  p {
    font-size: 1.2rem;
  }

  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
  }
`;
