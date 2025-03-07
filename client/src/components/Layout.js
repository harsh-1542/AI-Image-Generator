import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="wrapper">
        <Outlet /> {/* Renders the current route inside Layout */}
      </main>
    </>
  );
};

export default Layout;
