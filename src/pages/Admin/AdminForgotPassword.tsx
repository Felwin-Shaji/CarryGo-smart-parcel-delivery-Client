import { ROLES } from "../../shared/constants_Types/types/roles"
import { useAuth } from "../../Services/Auth"
import ForgotPasswordForm from "../../shared/components/Forms/ForgotPasswordForm"

const AdminForgotPassword = () => {
    const {handleForgotPassword} = useAuth()
  return (
    <>
        <ForgotPasswordForm title="Admin forgot password" onSubmit={handleForgotPassword} role={ROLES.ADMIN}/>
    </>
  )
}

export default AdminForgotPassword