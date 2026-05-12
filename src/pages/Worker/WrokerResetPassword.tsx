import { useAuth } from '../../Services/Auth'
import ResetPasswordForm from '../../shared/components/Forms/ResetPasswordForm'
import { ROLES } from '../../shared/constants_Types/types/roles'

const WrokerResetPassword = () => {
    const {handleResetPassword} = useAuth()
  return (
    <ResetPasswordForm title="Worker Reset password" onSubmit={handleResetPassword} role={ROLES.WORKER}/>
  )
}

export default WrokerResetPassword