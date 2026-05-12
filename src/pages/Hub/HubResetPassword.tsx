import { ROLES } from "../../shared/constants_Types/types/roles"
import { useAuth } from "../../Services/Auth"
import ResetPasswordForm from "../../shared/components/Forms/ResetPasswordForm"

const HubResetPassword = () => {
    const {handleResetPassword} = useAuth()
  return (
    <>
        <ResetPasswordForm title="Hub Reset password" onSubmit={handleResetPassword} role={ROLES.HUB}/>
    </>
  )
}

export default HubResetPassword