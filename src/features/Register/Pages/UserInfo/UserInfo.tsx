import React, { FC, useRef, useState, useEffect } from 'react'
import { InputContainer, ContentContainer, HeaderContent, Title, Subtitle, InputText } from './styles'
import { TextInput } from 'react-native-paper'
import { TextInput as TextInputType } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { isValidCPF } from '@brazilian-utils/brazilian-utils'
import { isEmpty, validDate } from '@utils/validations'
import { SnackBar } from '@components/atoms/SnackBar/SnackBar'
import { DarkTemplate } from '@components/templates/DarkTemplate/DarkTemplate'
import { i18n } from '@i18n'
import { theme } from '@theme'
import { validAllInfo } from './utils'

export const UserInfo: FC = ({ cache }) => {
    const [visible, setVisible] = useState(false)

    const [name, setName] = useState('Matheus')
    const [cpf, setCpf] = useState('482.085.298-18')
    const [birthDate, setBirthDate] = useState('31/03/2000')

    const [error, setError] = useState('')

    const nameInputRef = useRef<TextInputType>(null)

    const onToggleSnackBar = () => setVisible(true)

    useEffect(() => {
        nameInputRef.current.focus()
    }, [])

    return (
        <DarkTemplate>
            <HeaderContent>
                <Title>{i18n.t('title.welcome')}</Title>
                <Subtitle>{i18n.t('subtitle.signUp')}</Subtitle>
            </HeaderContent>
            <ContentContainer>
                <InputContainer>
                    <InputText>{i18n.t('labels.name')}</InputText>
                    <TextInput
                        onBlur={async () => {
                            if (isEmpty(name)) {
                                setError(i18n.t('error.emptyName'))
                                onToggleSnackBar()
                            }
                        }}
                        onChangeText={setName}
                        onFocus={async () => await validAllInfo(name, cpf, birthDate, cache)}
                        ref={nameInputRef}
                        style={{ backgroundColor: theme.colors.lightGrey, height: 55, marginBottom: 30 }}
                        theme={{ colors: { primary: 'black' } }}
                        value={name}
                    />

                    <InputText>{i18n.t('labels.cpf')}</InputText>
                    <TextInput
                        onBlur={async () => {
                            await validAllInfo(name, cpf, birthDate, cache)
                            if (!isEmpty(cpf) && !isValidCPF(cpf)) {
                                setError(i18n.t('error.invalidCPF'))
                                onToggleSnackBar()
                            }
                        }}
                        onChangeText={setCpf}
                        onFocus={async () => await validAllInfo(name, cpf, birthDate, cache)}
                        render={props => <TextInputMask {...props} keyboardType="numeric" type="cpf" />}
                        style={{ backgroundColor: theme.colors.lightGrey, height: 55, marginBottom: 30 }}
                        theme={{ colors: { primary: 'black' } }}
                        value={cpf}
                    />

                    <InputText>{i18n.t('labels.birthDate')}</InputText>
                    <TextInput
                        onBlur={async () => {
                            await validAllInfo(name, cpf, birthDate, cache)
                            if (!validDate(birthDate)) {
                                setError(i18n.t('error.invalidDate'))
                                onToggleSnackBar()
                            }
                        }}
                        onChangeText={setBirthDate}
                        onFocus={async () => await validAllInfo(name, cpf, birthDate, cache)}
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
                        style={{ backgroundColor: theme.colors.lightGrey, height: 55, marginBottom: 20 }}
                        theme={{ colors: { primary: 'black' } }}
                        value={birthDate}
                    />
                </InputContainer>
            </ContentContainer>

            {visible && <SnackBar backgroundColor={theme.colors.danger50} message={error} setVisible={setVisible} />}
        </DarkTemplate>
    )
}