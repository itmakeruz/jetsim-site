import LoginHeader from "../Login/components/LoginHeader";
import LoginAnimation from "../Login/components/LoginAnimation";
import VerificationForm from "./components/VerificationForm";
import LoginTerms from "../Login/components/LoginTerms";

const Verification = () => {
  return (
    <div className="js-auth">
      <LoginHeader />

      <div className="js-auth-body">
        {/* Та же логика, что на логине: колонку формы держим узкой */}
        <div className="js-auth-form">
          <VerificationForm />
          <LoginTerms />
        </div>

        <LoginAnimation />
      </div>
    </div>
  );
};

export default Verification;
