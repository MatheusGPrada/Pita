import React, { FC, useRef, useState, useCallback } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { InputContainer, ContentContainer, HeaderContent, Title, Subtitle, InputText } from './styles'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { DarkTemplate } from '../../../../components/templates/DarkTemplate/DarkTemplate'
import { Snackbar, TextInput } from 'react-native-paper'
import { i18n } from '../../../../../src/_translate/i18n'
import { TextInput as TextInputType } from 'react-native'
import { theme } from '../../../../../src/styles/theme'
import { TextInputMask } from 'react-native-masked-text'
import { isValidCPF } from '@brazilian-utils/brazilian-utils'

Icon.loadFont()

export const UserInfo: FC = (setShowNext: Function) => {
    const [visible, setVisible] = React.useState(false)

    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [birthDate, setBirthDate] = useState('')

    const [error, setError] = useState('')

    const nameInputRef = useRef<TextInputType>(null)

    const onDismissSnackBar = () => setVisible(false)
    const onToggleSnackBar = () => setVisible(true)

    const isEmpty = (str?: string) => !str || 0 === str.length

    const { navigate } = useNavigation()

    const validAllInfo = () => {
        if (!isEmpty(name) && isValidCPF(cpf) && !isEmpty(birthDate)) {
            //setShowNext(true)
        }
    }

    useFocusEffect(
        useCallback(() => {
            console.debug('setShowNext', setShowNext)
            nameInputRef.current.focus()
        }, []),
    )

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
                        onChangeText={setName}
                        onFocus={() => null}
                        onBlur={() => validAllInfo()}
                        style={{ backgroundColor: theme.colors.lightGrey, height: 55, marginBottom: 30 }}
                        theme={{ colors: { primary: 'black' } }}
                        value={name}
                        ref={nameInputRef}
                    />

                    <InputText>{i18n.t('labels.cpf')}</InputText>
                    <TextInput
                        onChangeText={setCpf}
                        onBlur={() => {
                            if (!isEmpty(cpf) && !isValidCPF(cpf)) {
                                setError(i18n.t('error.invalidCPF'))
                                onToggleSnackBar()
                            }
                            if (!isEmpty(cpf) && isValidCPF(cpf)) {
                                validAllInfo()
                            }
                        }}
                        onFocus={() => {
                            onDismissSnackBar()
                            setError('')
                        }}
                        style={{ backgroundColor: theme.colors.lightGrey, height: 55, marginBottom: 30 }}
                        theme={{ colors: { primary: 'black' } }}
                        value={cpf}
                        render={props => <TextInputMask {...props} type="cpf" keyboardType="numeric" />}
                    />

                    <InputText>{i18n.t('labels.birthDate')}</InputText>
                    <TextInput
                        onChangeText={setBirthDate}
                        onFocus={() => null}
                        onBlur={() => {
                            validAllInfo()
                        }}
                        style={{ backgroundColor: theme.colors.lightGrey, height: 55, marginBottom: 20 }}
                        theme={{ colors: { primary: 'black' } }}
                        value={birthDate}
                        render={props => (
                            <TextInputMask
                                {...props}
                                type={'datetime'}
                                options={{
                                    format: 'DD/MM/YYYY',
                                }}
                                keyboardType="numeric"
                            />
                        )}
                    />
                </InputContainer>
            </ContentContainer>

            <Snackbar
                action={{
                    label: 'OK',
                    onPress: () => null,
                }}
                onDismiss={onDismissSnackBar}
                visible={visible}
                style={{ backgroundColor: theme.colors.danger50 }}
            >
                {error}
            </Snackbar>
        </DarkTemplate>
    )
}
