import { useState, useEffect } from "react";

const useCarts = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem("user"));
    if (localStorageUser?.cart) {
      setCart(localStorageUser.cart);
    }
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    const userData = JSON.parse(localStorage.getItem("user")) || {};
    userData.cart = updatedCart;
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return { cart, updateCart };
};

export default useCarts;
