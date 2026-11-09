import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import ProfileHeader from "./components/ProfileHeader";
import ProfileTabs from "./components/ProfileTabs";
import Footer from "@/layouts/Footer/Footer";
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
    <div className="js-shell">
      <Navbar />
      <main
        id="main-content"
        className={`container js-account ${currentPath !== APP_ROUTES.CART ? "ew-account-shell" : ""}`}
      >
        <div>
          <ProfileHeader />
          <ProfileTabs />
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileLayout;
