import { useState, useEffect } from "react";

const useCart = (productDetail, user, updateUser, toggleModal) => {
  const [cartItem, setCartItem] = useState({ price: 0, number: 0 });

  useEffect(() => {
    if (productDetail) {
      setCartItem({ price: productDetail.price, number: 0 });
    }
  }, [productDetail]);

  const updateCart = (cartItemToAdd) => {
    const userData = JSON.parse(localStorage.getItem("user")) || {};
    const cart = userData.cart || [];
    const existingCartItem = cart.find((item) => item.id === cartItemToAdd.id);

    if (existingCartItem) {
      existingCartItem.number = cartItemToAdd.number;
    } else {
      cart.push(cartItemToAdd);
    }

    userData.cart = cart;
    updateUser({ ...userData });
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const addCartItemNumber = () => {
    setCartItem((prevCartItem) => ({
      ...prevCartItem,
      number: prevCartItem.number + 1,
    }));
  };

  const removeCartItemNumber = () => {
    setCartItem((prevCartItem) => ({
      ...prevCartItem,
      number: prevCartItem.number > 0 ? prevCartItem.number - 1 : 0,
    }));
  };

  const handleAddToCart = () => {
    const cartItemToAdd = { ...productDetail, number: cartItem.number };
    updateCart(cartItemToAdd);
    toggleModal();
  };

  return { cartItem, addCartItemNumber, removeCartItemNumber, handleAddToCart };
};

export default useCart;
