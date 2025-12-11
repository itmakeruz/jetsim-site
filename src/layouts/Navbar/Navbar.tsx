import { ASSETS } from "@/assets";
import HeaderLeft from "./components/HeaderLeft";
import HeaderRight from "./components/HeaderRight";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "@/router/path";

const Navbar: React.FC = () => {
  return (
    <header className="relative z-[11]">
      <div className="container">
        <div className="flex relative z-[1] justify-between items-center my-[10px]">
          <HeaderLeft />
          <Link to={APP_ROUTES.HOME} className="md:hidden">
            <img
              src={ASSETS.logo}
              alt="logo"
              className="w-[140px] object-contain shrink-0"
            />
          </Link>
          <HeaderRight />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
