import React, { FC, useState } from 'react'
import { Content } from '../../../../components/utils/Screen'
import { ButtonContainer, InputContainer } from '../../../../components/styledComponents/InputContainer'
import { ForgotPassword } from '../../../../components/styledComponents/ForgottPassword'
import { SafeAreaView, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { Button } from '../../../../components/atoms/Button'
import { theme } from '../../../../styles/theme'
import { i18n } from '../../../../_translate/i18n'
import { Snackbar, TextInput } from 'react-native-paper'
import { Image, ImageContainer } from './styles'
import { useNavigation } from '@react-navigation/native'
import { Template } from '../../../../components/templates/template'

Icon.loadFont()

export const Login: FC = () => {
    // TO DO - IMPLEMENT THE INPUTS AND CPF VALIDATION

    const [user, setUser] = useState()
    const [error, setError] = useState('')
    const [password, setPassword] = useState()
    const [showPassword, setShowPassword] = useState(true)
    const [visible, setVisible] = React.useState(false)

    const onToggleSnackBar = () => setVisible(!visible)

    const onDismissSnackBar = () => setVisible(false)

    const { navigate } = useNavigation()

    const handleForgotPassword = () => {
        // TO DO - ADD RECOVERY PASSWORD
    }

    const doLogin = () => {
        user === 'Matheus' && password === '12345' ? navigate('Home') : setLoginError()
    }

    const setLoginError = () => {
        setError(i18n.t('labels.invalidUserOrPassword'))
        onToggleSnackBar()
    }

    const cleanError = () => {
        setError('')
    }

    return (
        <Template safeAreaBackgroundColor="black" statusBarBackgroundColor="black" statusBarStyle="light-content">
            <ImageContainer>
                <Image resizeMode="contain" source={require('../../../../assets/images/logo.png')} />
            </ImageContainer>
            <InputContainer>
                <TextInput
                    label={i18n.t('labels.user')}
                    onChangeText={setUser}
                    onFocus={() => cleanError()}
                    style={{ backgroundColor: 'rgb(255, 255, 255)', borderRadius: 10, height: 55 }}
                    theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                    value={user}
                />
            </InputContainer>
            <InputContainer>
                <TextInput
                    label={i18n.t('labels.password')}
                    onChangeText={setPassword}
                    onFocus={() => cleanError()}
                    right={
                        password ? (
                            <TextInput.Icon
                                name={() =>
                                    showPassword ? (
                                        <Icon color="black" name="eye" size={theme.size.m36} />
                                    ) : (
                                        <Icon color="black" name="eye-off" size={theme.size.m36} />
                                    )
                                }
                                onPress={() => setShowPassword(!showPassword)}
                            />
                        ) : (
                            ''
                        )
                    }
                    secureTextEntry={showPassword}
                    style={{ backgroundColor: 'rgb(255, 255, 255)', borderRadius: 10, height: 55 }}
                    theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                    value={password}
                />
                <ForgotPassword onPress={handleForgotPassword}>{i18n.t('labels.forgotPassword')}</ForgotPassword>
            </InputContainer>

            <ButtonContainer>
                <Button
                    disabled={false}
                    label={i18n.t('buttonLabels.login')}
                    labelSize="large"
                    onPress={() => doLogin()}
                    showIconBeforeText={false}
                />
            </ButtonContainer>

            <Snackbar
                action={{
                    label: 'OK',
                    onPress: () => {},
                }}
                onDismiss={onDismissSnackBar}
                visible={visible}
            >
                {error}
            </Snackbar>
        </Template>
    )
}
