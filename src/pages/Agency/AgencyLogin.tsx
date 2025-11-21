import { useAuth } from "../../Services/Auth"
import LoginForm from "../../components/Forms/LoginForm";
import { ROLES } from "../../constants_Types/types/roles";

const AgencyLogin = () => {

    const { handleLogin } = useAuth()
    return (
        <LoginForm title="Agency Login" onSubmit={handleLogin} role={ROLES.AGENCY} />
    )
}

export default AgencyLogin