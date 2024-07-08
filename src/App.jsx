import { createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "@/components/common/Layout";
import useAuth from "@/hooks/useAuth";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import ProductsList from "./pages/ProductsList";

const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

function App() {
  const { user, setUser } = useAuth();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
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
