import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Bottom from "../Bottom/Bottom";
import { useAuthStore } from "../../store/authStore";
import Loader from "../../components/Loader";

const MainLayout = () => {
  const { isLoading } = useAuthStore();
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <Outlet />
      <Bottom />
    </div>
  );
};

export default MainLayout;
