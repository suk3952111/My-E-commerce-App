import { useState, useEffect } from "react";
import styles from "./CartItem.module.css";

const CartItem = ({ item, updateCart, removeItem }) => {
  const [quantity, setQuantity] = useState(item.number);

  useEffect(() => {
    if (quantity === 0) {
      removeItem(item.id);
    } else {
      updateCart(item.id, quantity);
    }
  }, [quantity]);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  console.log(item);

  return (
    <li className={styles.body}>
      <div>
        <h2>{item.title}</h2>
        <p>가격: ${item.price}</p>
        <p>수량: {quantity}</p>
        <button onClick={increaseQuantity}>+</button>
        <button onClick={decreaseQuantity}>-</button>
        <button onClick={() => removeItem(item.id)}>삭제</button>
      </div>
      <img className={styles.image} src={item.image} alt="itemImage" />
    </li>
  );
};

export default CartItem;
