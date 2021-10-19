import React, { FC, useState, useRef } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { Snackbar, TextInput } from 'react-native-paper'
import { Image, ImageContainer, ContentContainer } from './styles'
import { useNavigation } from '@react-navigation/native'
import { TextInput as TextInputType } from 'react-native'
import { ButtonContainer, InputContainer } from '@components/styledComponents/InputContainer/InputContainer'
import { ForgotPassword } from '@components/styledComponents/ForgottPassword/ForgottPassword'
import { Button } from '@components/atoms/Button/Button'
import { i18n } from '@i18n'
import { HOME_STACK } from '@routes/Contants'
import { DarkTemplate } from '@components/templates/DarkTemplate/DarkTemplate'

Icon.loadFont()

export const Login: FC = () => {
    const [user, setUser] = useState('Matheus')
    const [error, setError] = useState('')
    const [password, setPassword] = useState('12345')
    const [showPassword, setShowPassword] = useState(true)
    const [visible, setVisible] = React.useState(false)

    const userInputRef = useRef<TextInputType>(null)
    const passwordInputRef = useRef<TextInputType>(null)

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
        setError(i18n.t('error.invalidUserOrPassword'))
        onToggleSnackBar()
    }

    const cleanError = () => {
        setError('')
    }

    return (
        <DarkTemplate>
            <ImageContainer>
                <Image resizeMode="contain" source={require('../../../../assets/images/logo.png')} />
            </ImageContainer>
            <ContentContainer>
                <InputContainer>
                    <TextInput
                        onChangeText={setUser}
                        onFocus={() => cleanError()}
                        onSubmitEditing={() => passwordInputRef.current.focus()}
                        placeholder={i18n.t('labels.user')}
                        ref={userInputRef}
                        style={{ backgroundColor: 'rgb(255, 255, 255)', height: 45 }}
                        theme={{ colors: { primary: 'black' } }}
                        value={user}
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        onChangeText={setPassword}
                        onFocus={() => cleanError()}
                        onSubmitEditing={() => doLogin()}
                        placeholder={i18n.t('labels.password')}
                        ref={passwordInputRef}
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
                        style={{ backgroundColor: 'rgb(255, 255, 255)', height: 45 }}
                        theme={{ colors: { primary: 'black' } }}
                        value={password}
                    />
                    <ForgotPassword onPress={handleForgotPassword}>{i18n.t('labels.forgotPassword')}</ForgotPassword>
                </InputContainer>
            </ContentContainer>
            <ButtonContainer>
                <Button label={i18n.t('buttonLabels.login')} labelSize="large" onPress={() => doLogin()} useButtonContainer={true} />
            </ButtonContainer>

            <Snackbar
                action={{
                    label: i18n.t('labels.OK'),
                    onPress: () => null,
                }}
                onDismiss={onDismissSnackBar}
                visible={visible}
            >
                {error}
            </Snackbar>
        </DarkTemplate>
    )
}
