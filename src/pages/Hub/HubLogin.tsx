import LoginForm from "../../components/Forms/LoginForm"
import { ROLES } from "../../constants_Types/types/roles"
import { useAuth } from "../../Services/Auth"

const HubLogin = () => {
    const { handleLogin } = useAuth()
  return (
    <>
    <LoginForm title="Hub Login" onSubmit={handleLogin} role={ROLES.HUB} />
    </>
  )
}

export default HubLogin