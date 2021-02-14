import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { LoginTemplate } from '../../../../components/templates/LoginTemplate';

export const Login = () => {
    const { navigate } = useNavigation();

    const handleForgotPassword = () => {
        //TO DO - ADD RECOVERY PASSWORD
    };

    return <LoginTemplate forgotPasswordPress={handleForgotPassword} />;
};
