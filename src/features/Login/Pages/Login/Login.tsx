import React, { FC, useState } from 'react'
import { ButtonContainer, InputContainer } from '../../../../components/styledComponents/InputContainer/InputContainer'
import { ForgotPassword } from '../../../../components/styledComponents/ForgottPassword/ForgottPassword'
import Icon from 'react-native-vector-icons/Feather'
import { Button } from '../../../../components/atoms/Button/Button'
import { i18n } from '../../../../_translate/i18n'
import { Snackbar, TextInput } from 'react-native-paper'
import { Image, ImageContainer } from './styles'
import { useNavigation } from '@react-navigation/native'
import { LightTemplate } from '../../../../components/templates/LightTemplate/LightTemplate'
import { HOME_STACK } from '../../../../routes/Contants'

Icon.loadFont()

export const Login: FC = () => {
    const [user, setUser] = useState('Matheus')
    const [error, setError] = useState('')
    const [password, setPassword] = useState('12345')
    const [showPassword, setShowPassword] = useState(true)
    const [visible, setVisible] = React.useState(false)

    const onToggleSnackBar = () => setVisible(!visible)

    const onDismissSnackBar = () => setVisible(false)

    const { navigate, reset } = useNavigation()

    const handleForgotPassword = () => {
        // TO DO - ADD RECOVERY PASSWORD
    }

    const doLogin = () => {
        user === 'Matheus' && password === '12345' ? navigate('HomeStack', { screen: 'Home' }) : setLoginError()
        reset({
            index: 0,
            routes: [{ name: HOME_STACK }],
        })
    }

    const setLoginError = () => {
        setError(i18n.t('labels.invalidUserOrPassword'))
        onToggleSnackBar()
    }

    const cleanError = () => {
        setError('')
    }

    return (
        <LightTemplate>
            <ImageContainer>
                <Image resizeMode="contain" source={require('../../../../assets/images/logo.png')} />
            </ImageContainer>
            <InputContainer>
                <TextInput
                    label={i18n.t('labels.user')}
                    onChangeText={setUser}
                    onFocus={() => cleanError()}
                    style={{ backgroundColor: 'rgb(255, 255, 255)', borderRadius: 10, height: 55 }}
                    theme={{ colors: { primary: 'black' } }}
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
                                        <Icon color="black" name="eye" size={36} />
                                    ) : (
                                        <Icon color="black" name="eye-off" size={36} />
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
                    theme={{ colors: { primary: 'black' } }}
                    value={password}
                />
                <ForgotPassword onPress={handleForgotPassword}>{i18n.t('labels.forgotPassword')}</ForgotPassword>
            </InputContainer>

            <ButtonContainer>
                <Button label={i18n.t('buttonLabels.login')} labelSize="large" onPress={() => doLogin()} useButtonContainer={true} />
            </ButtonContainer>

            <Snackbar
                action={{
                    label: 'OK',
                    onPress: () => null,
                }}
                onDismiss={onDismissSnackBar}
                visible={visible}
            >
                {error}
            </Snackbar>
        </LightTemplate>
    )
}
