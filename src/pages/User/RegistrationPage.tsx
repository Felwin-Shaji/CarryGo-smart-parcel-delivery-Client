import RegistrationForm from '../../components/Forms/RegistrationForm';
import { ROLES } from '../../constants_Types/types/roles';
import { useAuth } from '../../Services/Auth';



export interface OtpMeta {
    email: string;
    role: string;
    expiresAt: string;
}


const RegistrationPage = () => {
    const { handleRegistration } = useAuth();

    return (
        <div><RegistrationForm title='User Registarion' onSubmit={handleRegistration} role={ROLES.USER} /></div>
    )
}

export default RegistrationPage

