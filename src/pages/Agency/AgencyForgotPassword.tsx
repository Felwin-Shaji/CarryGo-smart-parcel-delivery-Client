import ForgotPasswordForm from "../../components/Forms/ForgotPasswordForm"
import { ROLES } from "../../constants_Types/types/roles"
import { useAuth } from "../../Services/Auth"

const AgencyForgotPassword = () => {
    const {handleForgotPassword} = useAuth()
  return (
    <>
        <ForgotPasswordForm title="Agency forgot password" onSubmit={handleForgotPassword} role={ROLES.AGENCY}/>
    </>
  )
}

export default AgencyForgotPassword