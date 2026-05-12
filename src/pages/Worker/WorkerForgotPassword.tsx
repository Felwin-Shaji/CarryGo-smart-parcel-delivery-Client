import { ROLES } from "../../shared/constants_Types/types/roles"
import { useAuth } from "../../Services/Auth"
import ForgotPasswordForm from "../../shared/components/Forms/ForgotPasswordForm"

const WorkerForgotPassword = () => {
    const {handleForgotPassword} = useAuth()
  return (
    <>
        <ForgotPasswordForm title="Worker forgot password" onSubmit={handleForgotPassword} role={ROLES.WORKER}/>
    </>
  )
}

export default WorkerForgotPassword