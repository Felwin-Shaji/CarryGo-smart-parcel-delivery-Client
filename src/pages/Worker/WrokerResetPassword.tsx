import ResetPasswordForm from '../../components/Forms/ResetPasswordForm'
import { useAuth } from '../../Services/Auth'
import { ROLES } from '../../constants_Types/types/roles'

const WrokerResetPassword = () => {
    const {handleResetPassword} = useAuth()
  return (
    <ResetPasswordForm title="Worker Reset password" onSubmit={handleResetPassword} role={ROLES.WORKER}/>
  )
}

export default WrokerResetPassword