import LoginForm from "../../components/LoginForm";

const LoginPage = () => {
  const handleLogin = (email: string, password: string) => {
    console.log("Logging in with:", email, password);
  };

  return <LoginForm title="User Login" onSubmit={handleLogin} />;
};

export default LoginPage;
