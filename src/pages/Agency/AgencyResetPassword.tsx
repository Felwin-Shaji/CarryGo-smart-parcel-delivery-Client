import ResetPasswordForm from "../../components/Forms/ResetPasswordForm"
import { ROLES } from "../../constants_Types/types/roles"
import { useAuth } from "../../Services/Auth"

const AgencyResetPassword = () => {
    const {handleResetPassword} = useAuth()
  return (
    <>
        <ResetPasswordForm title="Agency Reset password" onSubmit={handleResetPassword} role={ROLES.AGENCY}/>
    </>
  )
}

export default AgencyResetPassword