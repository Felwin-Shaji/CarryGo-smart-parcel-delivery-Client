import { ROLES } from "../../shared/constants_Types/types/roles"
import { useAuth } from "../../Services/Auth"
import ResetPasswordForm from "../../shared/components/Forms/ResetPasswordForm"

const AgencyResetPassword = () => {
    const {handleResetPassword} = useAuth()
  return (
    <>
        <ResetPasswordForm title="Agency Reset password" onSubmit={handleResetPassword} role={ROLES.AGENCY}/>
    </>
  )
}

export default AgencyResetPassword