import { Link, useNavigate } from "react-router-dom";
import { ASSETS } from "@/assets";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import { APP_ROUTES } from "@/router/path";

const LoginHeader = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={handleBack}
        className="lg:w-[62px] lg:h-[62px] w-[40px] h-[40px] lg:rounded-[12px] rounded border-[#4F7096] border flex items-center justify-center"
      >
        <img className="rotate-180 lg:w-8 w-6" src={ASSETS.arrowSvg} alt="" />
      </button>
      <Link className="lg:w-[300px] w-[120px] h-auto" to={APP_ROUTES.HOME}>
        <img className="w-full" src={ASSETS.logo} alt="" />
      </Link>
      <LanguageSwitcher />
    </div>
  );
};

export default LoginHeader;
