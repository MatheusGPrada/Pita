import React, { FC, useRef, useState, useCallback } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { InputContainer, ContentContainer, HeaderContent, Title, Subtitle } from './styles'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { DarkTemplate } from '../../../../components/templates/DarkTemplate/DarkTemplate'
import { Snackbar, TextInput } from 'react-native-paper'
import { i18n } from '../../../../../src/_translate/i18n'
import { TextInput as TextInputType } from 'react-native'
import { theme } from '../../../../../src/styles/theme'
import { TextInputMask } from 'react-native-masked-text'
import { isValidCPF } from '@brazilian-utils/brazilian-utils'

Icon.loadFont()

export const UserInfo: FC = () => {
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
                    <TextInput
                        label={i18n.t('labels.name')}
                        onChangeText={setName}
                        onFocus={() => null}
                        style={{ backgroundColor: theme.colors.lightGrey, height: 55, marginBottom: 30 }}
                        theme={{ colors: { primary: 'black' } }}
                        value={name}
                        placeholder={i18n.t('labels.name')}
                        ref={nameInputRef}
                    />

                    <TextInput
                        label={i18n.t('labels.cpf')}
                        onChangeText={setCpf}
                        onBlur={() => {
                            if (!isEmpty(cpf)) {
                                if (!isValidCPF(cpf)) {
                                    setError(i18n.t('error.invalidCPF'))
                                    onToggleSnackBar()
                                }
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

                    <TextInput
                        label={i18n.t('labels.birthDate')}
                        onChangeText={setBirthDate}
                        onFocus={() => null}
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
