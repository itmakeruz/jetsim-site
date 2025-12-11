import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/router/path";
import CartButton from "./CartButton";
import UserButton from "./UserButton";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import LogoutModal from "./LogoutModal";

function HeaderRight() {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
    navigate(APP_ROUTES.HOME);
  };

  return (
    <div className="flex items-center gap-5">
      <div className="hidden md:block">
        <LanguageSwitcher />
      </div>
      <>
        {isAuthenticated ? (
          <div className="flex items-center gap-5">
            <CartButton />
            <UserButton />
          </div>
        ) : (
          <LoginButton onClick={() => navigate(APP_ROUTES.LOGIN)} />
        )}
      </>
      <div className="bg-[#D9D9D9] w-[1px] min-h-full shrink-0 self-stretch hidden md:block"></div>
      <div className="hidden md:block">
        {isAuthenticated ? (
          <LogoutButton onClick={() => setIsLogoutModalOpen(true)} />
        ) : (
          <CartButton />
        )}
      </div>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}

export default HeaderRight;
