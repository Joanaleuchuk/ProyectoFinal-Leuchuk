// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../../Context/ShoppingCartContext";
import { db } from "../../Firebase/firebase";
import {collection,documentId,Timestamp,writeBatch,getDocs,query,where,addDoc,} from "firebase/firestore";
import FormsCheckout from "./FormsCheckout";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState("");
    const { cart, total, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const crearOrder = async ({ name, phone, email }) => {
        setLoading(true);

        try {
            const objOrder = {
                buyer: { name, phone, email },
                items: cart,
                total,
                date: Timestamp.fromDate(new Date()),
            };

            const batch = writeBatch(db);
            const outOfStock = [];
            const ids = cart.map((prod) => prod.id);
            const productRef = collection(db, "product");
            const productAddedFromFirestore = await getDocs(
                query(productRef, where(documentId(), "in", ids))
            );
            const { docs } = productAddedFromFirestore;

            docs.forEach((doc) => {
                const dataDoc = doc.data();
                const stockDb = dataDoc.stock;

                const productAddToCart = cart.find((prod) => prod.id === doc.id);
                const prodQuantity = productAddToCart?.quantity;

                if (stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity });
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc });
                }
            });

            if (outOfStock.length === 0) {
                await batch.commit();
                const orderRef = collection(db, "orders");
                const orderAdded = await addDoc(orderRef, objOrder);

                setOrderId(orderAdded.id);
                clearCart();
            } else {
                console.error("Hay productos fuera de stock");
            }
        } catch (error) {
            console.error("Error creando la orden:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Generando tu orden...</p>;
    }

    if (orderId) {
        return (
            <CheckoutContainer>
                <h1>Tu compra ha sido registrada</h1>
                <p>El ID de tu compra es: {orderId}</p>
                <Button onClick={() => navigate("/")}>Volver a la página principal</Button>
            </CheckoutContainer>
        );
    }

    return (
        <CheckoutContainer>
            <FormsCheckout onConfirm={crearOrder} />
        </CheckoutContainer>
    );
};

export default Checkout;

const CheckoutContainer = styled.div`
    max-width: 600px;
    margin: auto;
    padding: 20px;
    text-align: center;
`;

const Button = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;
