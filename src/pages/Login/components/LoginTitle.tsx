import { useTranslation } from "react-i18next";

const LoginTitle = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-1 text-[20px] font-bold leading-[1.25] text-[#0d141c] md:text-[24px] lg:text-[28px]">
      <h1>{t("login.title1")}</h1>
      <h1>{t("login.title2")}</h1>
    </div>
  );
};

export default LoginTitle;
