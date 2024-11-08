// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from "react";

export const CartContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const ShoppingCartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

export default ShoppingCartProvider;
