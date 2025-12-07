import { useTranslation } from "react-i18next";

interface LoginButtonProps {
  onClick: () => void;
}

const LoginButton = ({ onClick }: LoginButtonProps) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className="bg-[#112D6C] text-white px-7 py-2 text-[16px] font-medium rounded-[6px]"
    >
      {t("nav.login")}
    </button>
  );
};

export default LoginButton;
