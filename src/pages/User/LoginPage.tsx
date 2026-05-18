import { useState } from "react";
import { useAuth } from "../../Services/Auth";
import LoginForm from "../../shared/components/Forms/LoginForm";
import { ROLES } from "../../shared/constants_Types/types/roles";

const LoginPage = () => {
  const { handleLogin, handleGoogleAuth } = useAuth();
  const [loading, setLoading] = useState(false)

  const onGoogleLogin = async (credential: string) => {
    try {
      setLoading(true);
      await handleGoogleAuth(credential);
    } finally {
      setLoading(false);
    }
  };


  return <LoginForm title="User Login" onSubmit={handleLogin} role={ROLES.USER} onGoogleLogin={onGoogleLogin} loading={loading} />;
};

export default LoginPage;
