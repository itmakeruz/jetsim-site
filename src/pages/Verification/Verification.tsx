import LoginHeader from "../Login/components/LoginHeader";
import LoginAnimation from "../Login/components/LoginAnimation";
import VerificationForm from "./components/VerificationForm";
import LoginTerms from "../Login/components/LoginTerms";

const Verification = () => {
  return (
    <div className="flex min-h-[100dvh] flex-col gap-8 p-4 lg:gap-10 lg:px-[40px] lg:py-[35px] 2xl:px-[70px] 2xl:py-[50px]">
      <LoginHeader />

      <div className="grid flex-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 2xl:gap-24">
        {/* Та же логика, что на логине: колонку формы держим узкой */}
        <div className="mx-auto flex w-full max-w-[460px] flex-col lg:mx-0">
          <VerificationForm />
          <LoginTerms />
        </div>

        <LoginAnimation />
      </div>
    </div>
  );
};

export default Verification;
