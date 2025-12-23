import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import ProfileHeader from "./components/ProfileHeader";
import ProfileTabs from "./components/ProfileTabs";
import Navbar from "@/layouts/Navbar/Navbar";
import Error404 from "@/pages/404/Error404";
import { APP_ROUTES } from "@/router/path";

const ProfileLayout = () => {
  const { isAuthenticated, isInitialized, initializeAuth } = useAuthStore();
  const location = useLocation();

  // Initialize authentication state on component mount
  useEffect(() => {
    if (!isInitialized) {
      initializeAuth();
    }
  }, [isInitialized, initializeAuth]);

  if (!isInitialized) {
    return null; // Loading state
  }

  const currentPath = location.pathname;
  const protectedRoutes = [APP_ROUTES.PROFILE, APP_ROUTES.MYESIM];

  // Login qilgan bo'lsa va protected route ga kirsa, 404 ko'rsat
  if (!isAuthenticated && protectedRoutes.includes(currentPath)) {
    return <Error404 />;
  }

  return (
    <div className="">
      <Navbar />
      <div className="container">
        <div className="py-[25px] md:py-[30px] sm:py-[20px]">
          <ProfileHeader />
          <ProfileTabs />
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
