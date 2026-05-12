import { ROLES } from "../../shared/constants_Types/types/roles"
import { useAuth } from "../../Services/Auth"
import ResetPasswordForm from "../../shared/components/Forms/ResetPasswordForm"

const AdminResetPassword = () => {

  const { handleResetPassword } = useAuth()
  return (
    <>
      <ResetPasswordForm title="Admin Reset password" onSubmit={handleResetPassword} role={ROLES.ADMIN} />
    </>
  )
}

export default AdminResetPassword