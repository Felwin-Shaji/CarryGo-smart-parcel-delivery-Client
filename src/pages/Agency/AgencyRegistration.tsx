import { useState } from 'react';
import RegistrationForm from '../../components/Forms/RegistrationForm';
import { ROLES } from '../../shared/constants_Types/types/roles';
import { useAuth } from '../../Services/Auth';


export interface OtpMeta {
    email: string;
    role: string;
    expiresAt: string;
}


const AgencyRegistration = () => {

    const { handleRegistration } = useAuth();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: {
        name: string;
        email: string;
        mobile: string;
        password: string;
    }) => {
        try {
            setLoading(true);
            await handleRegistration(data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div><RegistrationForm title='Agency Registarion' onSubmit={onSubmit} role={ROLES.AGENCY} loading={loading} /></div>
    )
}

export default AgencyRegistration