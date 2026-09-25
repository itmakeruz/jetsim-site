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
import { useTariffStore } from "@/store/tariffStore";

function HeaderRight() {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const { setSelectedTariffs } = useTariffStore();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setSelectedTariffs([]);
    setIsLogoutModalOpen(false);
    navigate(APP_ROUTES.HOME);
  };

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <div className="hidden md:block">
        <LanguageSwitcher />
      </div>

      {isAuthenticated ? (
        <>
          <CartButton />
          <UserButton />
          <span className="hidden h-6 w-px shrink-0 bg-black/10 md:block" />
          <div className="hidden md:block">
            <LogoutButton onClick={() => setIsLogoutModalOpen(true)} />
          </div>
        </>
      ) : (
        <>
          <CartButton />
          <LoginButton onClick={() => navigate(APP_ROUTES.LOGIN)} />
        </>
      )}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}

export default HeaderRight;
