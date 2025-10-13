import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Bottom from "../Bottom/Bottom";

const MainLayout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Outlet />
      <Bottom />
    </div>
  );
};

export default MainLayout;
