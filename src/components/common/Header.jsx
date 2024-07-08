import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useAuthContext } from "@/App";
import { supabase } from "@/main";

function getLinkStyle({ isActive }) {
  return {
    textDecoration: isActive ? "underline" : "none",
  };
}

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();

  const localStorageUser = JSON.parse(localStorage.getItem("user"));

  const onLogout = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        alert(error.message);
      } else {
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error.message);
      alert(error.message);
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navigator}>
        <div className={styles.navigatorComponents}>
          <li>
            <NavLink style={getLinkStyle} to="/">
              Home
            </NavLink>
          </li>
        </div>
        <div className={styles.navigatorComponents}>
          {user ? (
            <>
              <NavLink style={getLinkStyle} to="/cart">
                장바구니
                {localStorageUser?.cart?.length > 0 &&
                  `(${localStorageUser.cart.length})`}
              </NavLink>
              <li>안녕하세요, {user.email}님</li>
              <li>
                <button onClick={onLogout}>로그아웃</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink style={getLinkStyle} to="/login">
                  로그인
                </NavLink>
              </li>
              <li>
                <NavLink style={getLinkStyle} to="/signup">
                  회원가입
                </NavLink>
              </li>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
