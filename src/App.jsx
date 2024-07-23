import { createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "@/components/common/Layout";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import ProductsList from "./pages/ProductsList";
import useAuth from "@/hooks/useAuth";
import useCarts from "@/hooks/useCarts";
import useUserCarts from "@/hooks/useUserCarts";

const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

function App() {
  const { user, setUser } = useAuth();
  const { cart, updateCart } = useCarts();
  const { userCart, updateUserCart, fetchUserCart } = useUserCarts();

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        cart,
        updateCart,
        userCart,
        updateUserCart,
        fetchUserCart,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ProductsList />} />
            <Route path="products" element={<Navigate to="/" replace />} />
            <Route path="products/:productSlug" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
