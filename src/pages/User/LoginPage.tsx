import { useAuth } from "../../Services/Auth";
import LoginForm from "../../components/Forms/LoginForm";
import { ROLES } from "../../constants_Types/types/roles";

const LoginPage = () => {
  const {handleLogin} = useAuth()

  return <LoginForm title="User Login" onSubmit={handleLogin} role={ROLES.USER} />;
};

export default LoginPage;
