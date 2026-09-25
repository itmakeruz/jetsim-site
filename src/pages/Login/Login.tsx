import LoginHeader from "./components/LoginHeader";
import LoginTitle from "./components/LoginTitle";
import LoginForm from "./components/LoginForm";
import LoginTerms from "./components/LoginTerms";
import LoginAnimation from "./components/LoginAnimation";

const Login = () => {
  return (
    <div className="flex min-h-[100dvh] flex-col gap-8 p-4 lg:gap-10 lg:px-[40px] lg:py-[35px] 2xl:px-[70px] 2xl:py-[50px]">
      <LoginHeader />

      <div className="grid flex-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 2xl:gap-24">
        {/* Колонку формы ограничиваем: поле ввода на всю ширину экрана выглядит сломанным */}
        <div className="mx-auto flex w-full max-w-[460px] flex-col lg:mx-0">
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
