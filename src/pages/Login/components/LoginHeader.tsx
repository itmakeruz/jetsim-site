import { Link } from "react-router-dom";
import { ASSETS } from "@/assets";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import { APP_ROUTES } from "@/router/path";

const LoginHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <Link className="lg:w-[200px] w-[150px] h-auto" to={APP_ROUTES.HOME}>
        <img className="w-full" src={ASSETS.logo} alt="" />
      </Link>
      <LanguageSwitcher />
    </div>
  );
};

export default LoginHeader;
