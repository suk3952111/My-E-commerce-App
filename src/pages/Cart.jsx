import CartItem from "@/components/Cart/CartItem";
import { useAuthContext } from "../App";
const Cart = () => {
  const { cart, updateCart } = useAuthContext();

  const calculateTotalPrice = (cart) => {
    return cart.reduce((total, item) => total + item.price * item.number, 0);
  };

  const handleUpdateCart = (id, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, number: newQuantity } : item
    );
    updateCart(updatedCart);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    updateCart(updatedCart);
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
              updateCart={handleUpdateCart}
              removeItem={handleRemoveItem}
            />
          ))}
        </ul>
      )}
      <h2>총 금액: ${calculateTotalPrice(cart).toFixed(2)}</h2>
    </div>
  );
};

export default Cart;
