import LoginForm from "../../components/LoginForm";
import { useAuth } from "../../Services/Logout";
import { ROLES } from "../../types/roles";


const AdminLoginPage = () => {
  const { handleLogin } = useAuth();
  return (
    <LoginForm title="Admin Login" onSubmit={handleLogin} role={ROLES.ADMIN} ></LoginForm>
  );
};

export default AdminLoginPage;