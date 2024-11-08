// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { CartContext } from "../../Context/ShoppingCartContext";

function CartWidget() {
  const [cart] = useContext(CartContext);

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div>
      🛒 <span>{totalQuantity}</span>
    </div>
  );
}

export default CartWidget;
