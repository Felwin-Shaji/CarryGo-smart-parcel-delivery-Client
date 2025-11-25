import ForgotPasswordForm from "../../components/Forms/ForgotPasswordForm"
import { ROLES } from "../../constants_Types/types/roles"
import { useAuth } from "../../Services/Auth"

const ForgotPassword = () => {
    const {handleForgotPassword} = useAuth()
  return (
    <>
        <ForgotPasswordForm title="User forgot password" onSubmit={handleForgotPassword} role={ROLES.USER}/>
    </>
  )
}

export default ForgotPassword