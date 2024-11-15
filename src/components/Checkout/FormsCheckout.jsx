/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import styled from "styled-components";


const FormsCheckout = ({ onConfirm }) => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(formData);
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <Title>Completa tu información</Title>
            <Label>
                Nombre completo:
                <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
            </Label>
            <Label>
                Teléfono:
                <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                />
            </Label>
            <Label>
                Correo electrónico:
                <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
            </Label>
            <Button type="submit">Confirmar compra</Button>
        </FormContainer>
    );
};

export default FormsCheckout;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 400px;
    margin: 0 auto;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
    font-size: 14px;
    color: #555;
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const Button = styled.button`
    padding: 10px;
    font-size: 16px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #218838;
    }
`;

const Title = styled.h2`
    text-align: center;
    color: #333;
`;