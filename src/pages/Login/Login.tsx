import LoginHeader from "./components/LoginHeader";
import LoginTitle from "./components/LoginTitle";
import LoginForm from "./components/LoginForm";
import LoginTerms from "./components/LoginTerms";
import LoginAnimation from "./components/LoginAnimation";

const Login = () => {
  return (
    <div className="js-auth">
      <LoginHeader />

      <div className="js-auth-body">
        {/* Колонку формы ограничиваем: поле ввода на всю ширину экрана выглядит сломанным */}
        <div className="js-auth-form">
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
