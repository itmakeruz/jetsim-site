import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useAuthStore } from "../../store/authStore";
import Loader from "../../components/Loader";

const SimpleLayout = () => {
  const { isLoading } = useAuthStore();
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default SimpleLayout;
