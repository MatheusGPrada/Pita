import React, { FC, useState, useRef } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { TextInput } from 'react-native-paper'
import { Image, ImageContainer, ContentContainer, SnackBarContainer } from './styles'
import { useNavigation } from '@react-navigation/native'
import { TextInput as TextInputType } from 'react-native'
import { ButtonContainer, InputContainer } from '@components/styledComponents/InputContainer/InputContainer'
import { ForgotPassword } from '@components/styledComponents/ForgottPassword/ForgottPassword'
import { Button } from '@components/atoms/Button/Button'
import { i18n } from '@i18n'
import { HOME_STACK } from '@routes/Contants'
import { DarkTemplate } from '@components/templates/DarkTemplate/DarkTemplate'
import api from 'src/api/api'
import { LOGIN } from 'src/api/endpoints'
import { theme } from '@theme'
import { SnackBar } from '@components/atoms/SnackBar/SnackBar'

Icon.loadFont()

export const Login: FC = () => {
    const [user, setUser] = useState('matheus@gmail.com')
    const [password, setPassword] = useState('M@th3us1')
    // const [user, setUser] = useState('')
    // const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(true)
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const userInputRef = useRef<TextInputType>(null)
    const passwordInputRef = useRef<TextInputType>(null)

    const onToggleSnackBar = () => setVisible(!visible)

    const { reset } = useNavigation()

    const handleForgotPassword = () => {
        // TO DO - ADD RECOVERY PASSWORD
    }

    const authenticate = async () => {
        let result
        setLoading(true)
        cleanError()
        await api
            .post(
                LOGIN,
                { senha: password, userName: user },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then(response => {
                const { data } = response
                result = data
                setLoading(false)
            })
            .catch(requestError => {
                result = requestError
                setLoading(false)
            })

        if (result?.token) {
            reset({
                index: 0,
                routes: [{ name: HOME_STACK, params: { patientInfo: result } }],
            })
        } else {
            setLoginError()
        }
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
                        style={{ backgroundColor: 'white', height: 45 }}
                        theme={{ colors: { primary: 'black' } }}
                        value={user}
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        onChangeText={setPassword}
                        onFocus={() => cleanError()}
                        onSubmitEditing={() => authenticate()}
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
                        style={{ backgroundColor: 'white', height: 45 }}
                        theme={{ colors: { primary: 'black' } }}
                        value={password}
                    />
                    <ForgotPassword onPress={handleForgotPassword}>{i18n.t('labels.forgotPassword')}</ForgotPassword>
                </InputContainer>
            </ContentContainer>
            <SnackBarContainer>
                {visible && <SnackBar backgroundColor={theme.colors.danger50} message={error} setVisible={setVisible} />}
            </SnackBarContainer>
            <ButtonContainer>
                <Button
                    label={i18n.t('buttonLabels.login')}
                    labelSize="large"
                    loading={loading}
                    onPress={() => authenticate()}
                    useButtonContainer={true}
                />
            </ButtonContainer>
        </DarkTemplate>
    )
}
