import { LoginForm } from "@components/Forms/LoginForm";
import AuthLayout from "layouts/auth";

const LoginPage = () => {
  return (
    <div className="grid place-items-center min-h-screen py-5">
      <LoginForm />
    </div>
  );
};

LoginPage.layout = AuthLayout;
export default LoginPage;
