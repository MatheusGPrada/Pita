import React, { FC, useState } from 'react'
import { Content } from '../../../../components/utils/Screen'
import { InputContainer } from '../../../../components/styledComponents/InputContainer'
import { ForgotPassword } from '../../../../components/styledComponents/ForgottPassword'
import { SafeAreaView, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Button } from '../../../../components/atoms/Button'
import { theme } from '../../../../styles/theme'
import { i18n } from '../../../../_translate/i18n'
import { TextInput } from 'react-native-paper'
import { Image, ImageContainer, StyledText } from './styles'
import { useNavigation } from '@react-navigation/native'

Icon.loadFont()

export const Login: FC = () => {
    // TO DO - IMPLEMENT THE INPUTS AND CPF VALIDATION

    const [user, setUser] = useState()
    const [error, setError] = useState()
    const [password, setPassword] = useState()
    const [showPassword, setShowPassword] = useState(true)
    const [showLoginError, setShowLoginError] = useState(false)

    const { navigate } = useNavigation()

    const handleForgotPassword = () => {
        // TO DO - ADD RECOVERY PASSWORD
    }

    const validUser = () => {
        user === 'Matheus' ? setError('') : setError(i18n.t('validation.invalidUser'))
    }

    const doLogin = () => {
        validUser()
        if (error) {
            showLoginError(true)
            return
        }
        user === 'Matheus' && password === '12345' ? navigate('Home') : setShowLoginError(true)
    }

    const cleanError = () => {
        setError('')
        setShowLoginError(false)
    }

    return (
        <>
            <SafeAreaView style={{ flex: 0 }} />
            <SafeAreaView style={{ backgroundColor: theme.colors.black100, flex: 1 }}>
                <StatusBar barStyle="light-content" />
                <Content>
                    <ImageContainer>
                        <Image resizeMode="contain" source={require('../../../../assets/images/logo.png')} />
                    </ImageContainer>
                    <InputContainer>
                        <TextInput label={i18n.t('labels.user')} onChangeText={setUser} onFocus={() => cleanError()} value={user} />
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
                                                <Icon color="black" name="eyeo" size={theme.size.m36} />
                                            )
                                        }
                                        onPress={() => setShowPassword(!showPassword)}
                                    />
                                ) : (
                                    ''
                                )
                            }
                            secureTextEntry={showPassword}
                            value={password}
                        />
                        <ForgotPassword onPress={handleForgotPassword}>{i18n.t('labels.forgotPassword')}</ForgotPassword>
                    </InputContainer>
                    {showLoginError && <StyledText>{error ? error : i18n.t('labels.invalidUserOrPassword')}</StyledText>}
                    <Button
                        disabled={false}
                        label={i18n.t('buttonLabels.login')}
                        labelSize="large"
                        onPress={() => doLogin()}
                        showIconBeforeText={false}
                    />
                </Content>
            </SafeAreaView>
        </>
    )
}
