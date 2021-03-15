import React, { FC, useState } from 'react'
import { Content } from '../../../../components/utils/Screen'
import { InputContainer } from '../../../../components/styledComponents/InputContainer'
import { ForgotPassword } from '../../../../components/styledComponents/ForgottPassword'
import { SafeAreaView, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Button } from '../../../../components/atoms/Button'
import { theme } from '../../../../styles/theme'
import { useUserValidation } from '../../../../utils/validation'
import { i18n } from '../../../../_translate/i18n'
import { TextInput } from 'react-native-paper'
import { ContainerWithMarginTop, Image, ImageContainer } from './styles'
// import { useNavigation } from '@react-navigation/native'

Icon.loadFont()

export const Login: FC = () => {
    // TO DO - IMPLEMENT THE INPUTS AND CPF VALIDATION
    const initialPassword = ''

    const { user, error, handleUser, validUserError } = useUserValidation()
    const [password, setPassword] = useState(initialPassword)
    const [showPassword, setShowPassword] = useState(true)

    // const { navigate } = useNavigation()

    // const navigateToSignUp = () => {
    //     navigate('SignUp')
    // }

    const getMessageError = (): string => (error ? error : '')

    const handleForgotPassword = () => {
        // TO DO - ADD RECOVERY PASSWORD
    }

    // const cleanError = () => {
    //    setError('')
    // }

    return (
        <>
            <SafeAreaView style={{ flex: 0 }} />
            <SafeAreaView style={{ backgroundColor: theme.colors.black100, flex: 1 }}>
                <StatusBar barStyle="light-content" />
                <Content>
                    <ImageContainer>
                        <Image resizeMode="contain" source={require('../../../../assets/images/barber_shop.png')} />
                    </ImageContainer>
                    <InputContainer>
                        <TextInput label={i18n.t('labels.user')} mode="outlined" onChangeText={handleUser} value={user} />
                        <ContainerWithMarginTop>
                            <TextInput
                                label={i18n.t('labels.password')}
                                mode="outlined"
                                onChangeText={setPassword}
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
                        </ContainerWithMarginTop>
                    </InputContainer>
                    <Button disabled={false} label={i18n.t('buttonLabels.login')} labelSize="large" showIconBeforeText={false} />
                </Content>
            </SafeAreaView>
        </>
    )
}
