import ResetPasswordForm from "../../components/Forms/ResetPasswordForm"
import { ROLES } from "../../constants_Types/types/roles"
import { useAuth } from "../../Services/Auth"

const HubResetPassword = () => {
    const {handleResetPassword} = useAuth()
  return (
    <>
        <ResetPasswordForm title="Hub Reset password" onSubmit={handleResetPassword} role={ROLES.HUB}/>
    </>
  )
}

export default HubResetPassword