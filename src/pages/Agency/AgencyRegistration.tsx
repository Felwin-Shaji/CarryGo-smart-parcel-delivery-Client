import RegistrationForm from '../../components/Forms/RegistrationForm';
import { ROLES } from '../../constants_Types/types/roles';
import { useAuth } from '../../Services/Auth';


export interface OtpMeta {
    email: string;
    role: string;
    expiresAt: string;
}


const AgencyRegistration = () => {
   const { handleRegistration } = useAuth();
    return (
        <div><RegistrationForm title='Agency Registarion' onSubmit={handleRegistration} role={ROLES.AGENCY} /></div>
    )
}

export default AgencyRegistration