import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCart,
  updateCartQuantity,
  removeCartItem,
} from "../api/cartApi";

import { getUserId } from "../utils/auth";

const CartContext = createContext();

export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([]);

  const loadCart = async () => {

    const userId = getUserId();

    if (!userId) {
      setCartItems([]);
      return;
    }

    try {

      const response = await getCart(userId);

      const items = response.items || [];

      setCartItems(items);

    } catch (err) {

      console.error("Load Cart Error", err);

    }

  };

  useEffect(() => {

    loadCart();

  }, []);

  const increaseQuantity = async (item) => {

  try {

    await updateCartQuantity(
      item.id,
      item.quantity + 1
    );

    loadCart();

  } catch (err) {

    console.error(err);

  }

};

const decreaseQuantity = async (item) => {

  try {

    if (item.quantity <= 1) {

      await removeCartItem(item.id);

    } else {

      await updateCartQuantity(
        item.id,
        item.quantity - 1
      );

    }

    loadCart();

  } catch (err) {

    console.error(err);

  }

};

  const removeFromCart = async (item) => {

  try {

    await removeCartItem(item.id);

    loadCart();

  } catch (err) {

    console.error(err);

  }

};

  const clearCart = () => {

    setCartItems([]);

  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (

    <CartContext.Provider
      value={{
        cartItems,
        loadCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalAmount,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>

  );

}

export const useCart = () => useContext(CartContext);