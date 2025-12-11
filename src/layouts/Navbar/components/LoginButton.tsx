import { useTranslation } from "react-i18next";

interface LoginButtonProps {
  onClick: () => void;
}

const LoginButton = ({ onClick }: LoginButtonProps) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className="bg-[#112D6C] text-white md:px-7 px-5 leading-none py-3 text-[16px] font-medium rounded-[6px]"
    >
      {t("nav.login")}
    </button>
  );
};

export default LoginButton;
