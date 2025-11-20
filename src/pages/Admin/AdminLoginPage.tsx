
import { useAuth } from "../../Services/Auth";
import LoginForm from "../../components/Forms/LoginForm";
import { ROLES } from "../../constants/types/roles";


const AdminLoginPage = () => {
  const { handleLogin } = useAuth();
  return (
    <LoginForm title="Admin Login" onSubmit={handleLogin} role={ROLES.ADMIN} ></LoginForm>
  );
};

export default AdminLoginPage;