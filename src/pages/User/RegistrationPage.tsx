import { useState } from 'react';
import RegistrationForm from '../../components/Forms/RegistrationForm';
import { ROLES } from '../../constants_Types/types/roles';
import { useAuth } from '../../Services/Auth';

const RegistrationPage = () => {
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
        <div><RegistrationForm title='User Registarion' onSubmit={onSubmit} role={ROLES.USER} loading={loading} /></div>
    )
}

export default RegistrationPage

