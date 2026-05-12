import { useState } from 'react';
import { ROLES } from '../../shared/constants_Types/types/roles';
import { useAuth } from '../../Services/Auth';
import RegistrationForm from '../../shared/components/Forms/RegistrationForm';


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
        <div><RegistrationForm title='Agency Registration' onSubmit={onSubmit} role={ROLES.AGENCY} loading={loading} /></div>
    )
}

export default AgencyRegistration