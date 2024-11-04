import { Outlet } from "react-router-dom";
import Header from "./Header";
import "./Layout.css"; // 스타일 파일을 추가합니다.

function Layout() {
  return (
    <div className="layout-background">
      <Header />
      <div className="layout-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
