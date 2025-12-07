import LoginHeader from "./components/LoginHeader";
import LoginTitle from "./components/LoginTitle";
import LoginForm from "./components/LoginForm";
import LoginTerms from "./components/LoginTerms";
import LoginAnimation from "./components/LoginAnimation";

const Login = () => {
  return (
    <div className="h-[100dvh] 2xl:px-[70px] 2xl:py-[80px] 2xl:gap-[150px] gap-[100px] lg:py-[60px] lg:px-[50px] p-4 overflow-hidden grid lg:grid-cols-[2fr_1.7fr] 2xl:grid-cols-[auto_600px]">
      <div className="w-full flex flex-col h-full">
        <LoginHeader />
        <LoginTitle />
        <LoginForm />
        <LoginTerms />
      </div>
      <LoginAnimation />
    </div>
  );
};

export default Login;
