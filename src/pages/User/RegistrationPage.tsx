import { useState } from 'react';
import { ROLES } from '../../shared/constants_Types/types/roles';
import { useAuth } from '../../Services/Auth';
import RegistrationForm from '../../shared/components/Forms/RegistrationForm';

const RegistrationPage = () => {
    const { handleRegistration, handleGoogleAuth } = useAuth();
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

    const onGoogleSignUp = async (credential: string) => {
        try {
            setLoading(true);
            await handleGoogleAuth(credential);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <RegistrationForm
                title='User Registration'
                onSubmit={onSubmit}
                role={ROLES.USER}
                loading={loading}
                onGoogleSignUp={onGoogleSignUp}
            />
        </div>
    )
}

export default RegistrationPage

