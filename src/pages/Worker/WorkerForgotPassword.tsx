import ForgotPasswordForm from "../../components/Forms/ForgotPasswordForm"
import { ROLES } from "../../constants_Types/types/roles"
import { useAuth } from "../../Services/Auth"

const WorkerForgotPassword = () => {
    const {handleForgotPassword} = useAuth()
  return (
    <>
        <ForgotPasswordForm title="Hub forgot password" onSubmit={handleForgotPassword} role={ROLES.WORKER}/>
    </>
  )
}

export default WorkerForgotPassword