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
import { isValid } from 'date-fns'

Icon.loadFont()

export const UserInfo: FC = ({ setShowNext }: UserInfoParams) => {
    const [visible, setVisible] = useState(false)

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
        const elements = birthDate.split('/')
        if (!isEmpty(name) && !isEmpty(cpf) && elements.length === 3) {
            if (isValidCPF(cpf) && isValid(new Date(elements[2].concat('/', elements[1], '/', elements[0])))) {
                setShowNext(true)
                return
            }
        }
        setShowNext(false)
        return
    }

    const validDate = () => {
        const elements = birthDate.split('/')
        if (elements.length === 3) {
            return isValid(new Date(elements[2].concat('/', elements[1], '/', elements[0]))) && parseInt(elements[0], 10) <= 31
        }
        return false
    }

    useFocusEffect(
        useCallback(() => {
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
                        onFocus={() => validAllInfo()}
                        onBlur={() => {
                            validAllInfo()
                            if (isEmpty(name)) {
                                setError(i18n.t('error.emptyName'))
                                onToggleSnackBar()
                            }
                        }}
                        style={{ backgroundColor: theme.colors.lightGrey, height: 55, marginBottom: 30 }}
                        theme={{ colors: { primary: 'black' } }}
                        value={name}
                        ref={nameInputRef}
                    />

                    <InputText>{i18n.t('labels.cpf')}</InputText>
                    <TextInput
                        onChangeText={setCpf}
                        onFocus={() => validAllInfo()}
                        onBlur={() => {
                            validAllInfo()
                            if (!isEmpty(cpf) && !isValidCPF(cpf)) {
                                setError(i18n.t('error.invalidCPF'))
                                onToggleSnackBar()
                            }
                        }}
                        style={{ backgroundColor: theme.colors.lightGrey, height: 55, marginBottom: 30 }}
                        theme={{ colors: { primary: 'black' } }}
                        value={cpf}
                        render={props => <TextInputMask {...props} type="cpf" keyboardType="numeric" />}
                    />

                    <InputText>{i18n.t('labels.birthDate')}</InputText>
                    <TextInput
                        onChangeText={setBirthDate}
                        onFocus={() => validAllInfo()}
                        onBlur={() => {
                            validAllInfo()
                            if (!validDate()) {
                                setError(i18n.t('error.invalidDate'))
                                onToggleSnackBar()
                            }
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
                    onPress: () => onDismissSnackBar(),
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
