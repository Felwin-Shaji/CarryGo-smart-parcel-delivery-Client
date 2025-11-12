
import LoginForm from "../../components/LoginForm";
import { ROLES } from "../../types/roles";
import { useAuth } from "../../Services/Logout";

const LoginPage = () => {
  const {handleLogin} = useAuth()

  return <LoginForm title="User Login" onSubmit={handleLogin} role={ROLES.USER} />;
};

export default LoginPage;
