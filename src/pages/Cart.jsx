import { useState, useEffect } from "react";
import CartItem from "@/components/Cart/CartItem";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem("user"));
    if (localStorageUser?.cart) {
      setCart(localStorageUser.cart);
    }
  }, []);

  const calculateTotalPrice = (cart) => {
    return cart.reduce((total, item) => total + item.price * item.number, 0);
  };

  const updateCart = (id, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, number: newQuantity } : item
    );
    setCart(updatedCart);
    const userData = JSON.parse(localStorage.getItem("user")) || {};
    userData.cart = updatedCart;
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    const userData = JSON.parse(localStorage.getItem("user")) || {};
    userData.cart = updatedCart;
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>장바구니가 비었습니다</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              updateCart={updateCart}
              removeItem={removeItem}
            />
          ))}
        </ul>
      )}
      <h2>총 금액: ${calculateTotalPrice(cart).toFixed(2)}</h2>
    </div>
  );
};

export default Cart;
