import ForgotPasswordForm from "../../components/Forms/ForgotPasswordForm"
import { ROLES } from "../../constants_Types/types/roles"
import { useAuth } from "../../Services/Auth"

const AdminForgotPassword = () => {
    const {handleForgotPassword} = useAuth()
  return (
    <>
        <ForgotPasswordForm title="Admin forgot password" onSubmit={handleForgotPassword} role={ROLES.ADMIN}/>
    </>
  )
}

export default AdminForgotPassword