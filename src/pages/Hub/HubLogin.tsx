import { ROLES } from "../../shared/constants_Types/types/roles"
import { useAuth } from "../../Services/Auth"
import LoginForm from "../../shared/components/Forms/LoginForm"

const HubLogin = () => {
    const { handleLogin } = useAuth()
  return (
    <>
    <LoginForm title="Hub Login" onSubmit={handleLogin} role={ROLES.HUB} />
    </>
  )
}

export default HubLogin