// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/firebase.jsx";
import Item from './Item';
import styled from 'styled-components';

function ItemListContainer() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "product"));
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productList);
      } catch (error) {
        console.error("Error loading products from Firestore:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Container>
      {products.map((product) => (
        <Item
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          imgUrl={product.image}
        />
      ))}
    </Container>
  );
}

export default ItemListContainer;

const Container = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
`;
