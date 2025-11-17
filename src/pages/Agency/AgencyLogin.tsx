import LoginForm from "../../components/LoginForm";
import { useAuth } from "../../Services/Auth"
import { ROLES } from "../../types/roles";

const AgencyLogin = () => {

    const { handleLogin } = useAuth()
    return (
        <LoginForm title="Agency Login" onSubmit={handleLogin} role={ROLES.AGENCY} />
    )
}

export default AgencyLogin