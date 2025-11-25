import ForgotPasswordForm from "../../components/Forms/ForgotPasswordForm"
import { ROLES } from "../../constants_Types/types/roles"
import { useAuth } from "../../Services/Auth"

const HubForgotPassword = () => {
    const {handleForgotPassword} = useAuth()
  return (
    <>
        <ForgotPasswordForm title="Hub forgot password" onSubmit={handleForgotPassword} role={ROLES.HUB}/>
    </>
  )
}

export default HubForgotPassword