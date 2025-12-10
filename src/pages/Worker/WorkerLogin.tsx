import LoginForm from '../../components/Forms/LoginForm'
import { useAuth } from '../../Services/Auth'
import { ROLES } from '../../constants_Types/types/roles'

const WorkerLogin = () => {
    const { handleLogin } = useAuth()
  return (
    <LoginForm title="Worker Login" onSubmit={handleLogin} role={ROLES.WORKER} />
  )
}

export default WorkerLogin