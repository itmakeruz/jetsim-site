import { Outlet, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { APP_ROUTES } from "@/router/path";
const AuthLayout = () => {
  const [params] = useSearchParams();
  const next = params.get("next");
  const destination =
    next === APP_ROUTES.MYESIM || next === APP_ROUTES.PROFILE
      ? next
      : APP_ROUTES.HOME;
  const { isAuthenticated, isInitialized, initializeAuth } = useAuthStore();

  // Initialize authentication state on component mount
  useEffect(() => {
    if (!isInitialized) {
      initializeAuth();
    }
  }, [isInitialized, initializeAuth]);

  // Agar token bo'lsa va haqiqiy bo'lsa, home page ga redirect qil
  if (isInitialized && isAuthenticated) {
    return <Navigate to={destination} replace />;
  }
  return (
    <div className="">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
