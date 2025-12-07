import { Link } from "react-router-dom";
import { APP_ROUTES } from "@/router/path";

const LoginTerms = () => {
  return (
    <p className="lg:text-[14px] text-[12px] justify-center font-medium text-[#8A9099] leading-[1.4] mt-auto flex flex-wrap gap-1">
      Продолжая, ты принимаешь наши{" "}
      <Link
        className="underline font-bold text-[#696B70]"
        to={APP_ROUTES.USLOVIYA}
      >
        Условия и положения
      </Link>
      и
      <Link
        className="underline font-bold text-[#696B70]"
        to={APP_ROUTES.CONFIDENTIAL}
      >
        Политику
      </Link>
      конфиденциальности.
    </p>
  );
};

export default LoginTerms;
