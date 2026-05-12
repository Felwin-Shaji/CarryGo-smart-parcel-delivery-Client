import { useAuth } from '../../Services/Auth'
import LoginForm from '../../shared/components/Forms/LoginForm'
import { ROLES } from '../../shared/constants_Types/types/roles'

const WorkerLogin = () => {
    const { handleLogin } = useAuth()
  return (
    <LoginForm title="Worker Login" onSubmit={handleLogin} role={ROLES.WORKER} />
  )
}

export default WorkerLogin