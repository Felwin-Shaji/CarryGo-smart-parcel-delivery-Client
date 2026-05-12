import { ROLES } from "../../shared/constants_Types/types/roles"
import { useAuth } from "../../Services/Auth"
import ForgotPasswordForm from "../../shared/components/Forms/ForgotPasswordForm"

const AgencyForgotPassword = () => {
    const {handleForgotPassword} = useAuth()
  return (
    <>
        <ForgotPasswordForm title="Agency forgot password" onSubmit={handleForgotPassword} role={ROLES.AGENCY}/>
    </>
  )
}

export default AgencyForgotPassword