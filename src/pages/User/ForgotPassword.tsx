import { ROLES } from "../../shared/constants_Types/types/roles"
import { useAuth } from "../../Services/Auth"
import ForgotPasswordForm from "../../shared/components/Forms/ForgotPasswordForm"

const ForgotPassword = () => {
    const {handleForgotPassword} = useAuth()
  return (
    <>
        <ForgotPasswordForm title="User forgot password" onSubmit={handleForgotPassword} role={ROLES.USER}/>
    </>
  )
}

export default ForgotPassword