import { useNavigation } from '@react-navigation/native';
import React, { FC, useState } from 'react';
import { getErrorText, useCpfValidations } from '../../../utils/validation';
import { i18n } from '../../../_translate/i18n';
import { Content } from '../../utils/Screen';
import { InputContainer } from '../../styledComponents/InputContainer';
import { ForgotPassword } from '../../styledComponents/ForgottPassword';
import { LoginProps } from './typings';
import { SafeAreaView, StatusBar, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Button } from '../../atoms/Button';
import { theme } from '../../../styles/theme';

Icon.loadFont();

export const LoginTemplate: FC<LoginProps> = ({ forgotPasswordPress }) => {
    // TO DO - IMPLEMENT THE INPUTS AND CPF VALIDATION
    // const initialCpf = ''
    // const initialPassword = ''

    // const { cpf, cpfError, cpfOnBlur, error, handleCpf, setError } = useCpfValidations(initialCpf)
    // const [password, setPassword] = useState(initialPassword)
    // const [errorCpfMessage, setErrorCpfMessage] = useState<boolean>(false)

    // const { navigate } = useNavigation()

    // const navigateToSignUp = () => {
    //     navigate('SignUp')
    // }

    // const getMessageErrorCpf = (): string[] | undefined => {
    //     if (errorCpfMessage) {
    //         return [' ']
    //     }
    //     return getErrorText(cpfError)
    // }

    // const cleanError = () => {
    //     setErrorCpfMessage(false)
    //     setError('')
    // }

    return (
        <>
            <SafeAreaView style={{ flex: 0 }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.black100 }}>
                <StatusBar barStyle="light-content" />
                <Content>
                    <InputContainer></InputContainer>
                    <InputContainer></InputContainer>
                    <Button disabled={false} label={i18n.t('labels.loginWithFacebook')}>
                        <Icon name="facebook-square" color="white" size={theme.size.m36} />
                    </Button>
                    <ForgotPassword onPress={forgotPasswordPress}>{i18n.t('labels.forgotPassword')}</ForgotPassword>
                </Content>
            </SafeAreaView>
        </>
    );
};
