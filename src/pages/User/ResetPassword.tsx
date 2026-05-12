import { ROLES } from "../../shared/constants_Types/types/roles"
import { useAuth } from "../../Services/Auth"
import ResetPasswordForm from "../../shared/components/Forms/ResetPasswordForm"

const ResetPassword = () => {
    const { handleResetPassword } = useAuth()
    return (
        <>
            <ResetPasswordForm title="User Reset password" onSubmit={handleResetPassword} role={ROLES.USER} />
        </>
    )
}

export default ResetPassword