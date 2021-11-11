import React, { FC, useRef, useState, useEffect } from 'react'
import { InputContainer, ContentContainer, HeaderContent, Title, Subtitle, InputText } from './styles'
import { TextInput } from 'react-native-paper'
import { TextInput as TextInputType } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { isValidCPF } from '@brazilian-utils/brazilian-utils'
import { isEmpty, validDate } from '@utils/validations'
import { SnackBar } from '@components/atoms/SnackBar/SnackBar'
import { i18n } from '@i18n'
import { theme } from '@theme'
import { saveUserInfoInCache, isValidUserInfo } from '@features/Register/Utils/utils'

export const UserInfo: FC = ({ cache, setDisabled }) => {
    const [visible, setVisible] = useState(false)

    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [birthDate, setBirthDate] = useState('')

    const [error, setError] = useState('')

    const nameInputRef = useRef<TextInputType>(null)

    const onToggleSnackBar = () => setVisible(true)

    useEffect(() => {
        nameInputRef.current.focus()
        isValidUserInfo(name, cpf, birthDate, setDisabled)
    }, [])

    return (
        <>
            <HeaderContent>
                <Title>{i18n.t('title.welcome')}</Title>
                <Subtitle>{i18n.t('subtitle.signUp')}</Subtitle>
            </HeaderContent>
            <ContentContainer>
                <InputContainer>
                    <InputText>{i18n.t('labels.name')}</InputText>
                    <TextInput
                        onBlur={async () => {
                            await saveUserInfoInCache(name, cpf, birthDate, cache)
                            await isValidUserInfo(name, cpf, birthDate, setDisabled)
                            if (isEmpty(name)) {
                                await setError(i18n.t('error.emptyName'))
                                await onToggleSnackBar()
                            }
                        }}
                        onChangeText={setName}
                        ref={nameInputRef}
                        style={{ backgroundColor: 'rgb(255, 255, 255)', height: 45, marginBottom: 20 }}
                        theme={{ colors: { primary: 'black' } }}
                        value={name}
                    />

                    <InputText>{i18n.t('labels.cpf')}</InputText>
                    <TextInput
                        onBlur={async () => {
                            await saveUserInfoInCache(name, cpf, birthDate, cache)
                            await isValidUserInfo(name, cpf, birthDate, setDisabled)
                            if (!isEmpty(cpf) && !isValidCPF(cpf)) {
                                await setError(i18n.t('error.invalidCPF'))
                                await onToggleSnackBar()
                            }
                        }}
                        onChangeText={setCpf}
                        render={props => <TextInputMask {...props} keyboardType="numeric" type="cpf" />}
                        style={{ backgroundColor: 'rgb(255, 255, 255)', height: 45, marginBottom: 20 }}
                        theme={{ colors: { primary: 'black' } }}
                        value={cpf}
                    />

                    <InputText>{i18n.t('labels.birthDate')}</InputText>
                    <TextInput
                        onBlur={async () => {
                            await saveUserInfoInCache(name, cpf, birthDate, cache)
                            await isValidUserInfo(name, cpf, birthDate, setDisabled)
                            if (!validDate(birthDate)) {
                                await setError(i18n.t('error.invalidDate'))
                                await onToggleSnackBar()
                            }
                        }}
                        onChangeText={setBirthDate}
                        render={props => (
                            <TextInputMask
                                {...props}
                                keyboardType="numeric"
                                options={{
                                    format: 'DD/MM/YYYY',
                                }}
                                type={'datetime'}
                            />
                        )}
                        style={{ backgroundColor: 'rgb(255, 255, 255)', height: 45, marginBottom: 20 }}
                        theme={{ colors: { primary: 'black' } }}
                        value={birthDate}
                    />
                </InputContainer>
            </ContentContainer>

            {visible && <SnackBar backgroundColor={theme.colors.danger50} message={error} setVisible={setVisible} />}
        </>
    )
}
