import LoginHeader from "./components/LoginHeader";
import LoginTitle from "./components/LoginTitle";
import LoginForm from "./components/LoginForm";
import LoginTerms from "./components/LoginTerms";
import LoginAnimation from "./components/LoginAnimation";

const Login = () => {
  return (
    <div className="h-[100dvh] 2xl:px-[70px] 2xl:py-[50px] lg:py-[35px] lg:px-[40px] flex flex-col 2xl:gap-[50px] gap-[30px] p-4 overflow-hidden">
      <LoginHeader />
      <div className="grid lg:grid-cols-[2fr_1.7fr] 2xl:grid-cols-[auto_600px] h-full 2xl:gap-[150px] md:gap-[100px]">
        <div className="w-full flex flex-col h-full">
          <LoginTitle />
          <LoginForm />
          <LoginTerms />
        </div>
        <LoginAnimation />
      </div>
    </div>
  );
};

export default Login;
