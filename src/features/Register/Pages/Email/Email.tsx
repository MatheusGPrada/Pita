import React, { FC, useState, useEffect } from 'react'
import { ContentContainer, HeaderContent, Subtitle, InputText, SnackBarContainer, Title } from './styles'
import { TextInput } from 'react-native-paper'
import { SnackBar } from '@components/atoms/SnackBar/SnackBar'
import { i18n } from '@i18n'
import { theme } from '@theme'
import { isValidEmail, saveEmailInCache } from '@features/Register/Utils/utils'

export const Email: FC = ({ cache, setDisabled }) => {
    const [visible, setVisible] = useState(false)
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const onToggleSnackBar = () => setVisible(true)

    const validEmail = () => {
        cache.set('Email', email)
        if (!isValidEmail(email, setDisabled)) {
            setError(i18n.t('error.invalidEmail'))
            onToggleSnackBar()
        }
    }

    useEffect(() => {
        isValidEmail(email, setDisabled)
    }, [email, setDisabled])

    return (
        <>
            <HeaderContent>
                <Title>{i18n.t('title.email')}</Title>
                <Subtitle>{i18n.t('subtitle.insertEmail')}</Subtitle>
            </HeaderContent>
            <ContentContainer>
                <InputText>{i18n.t('labels.email')}</InputText>
                <TextInput
                    keyboardType="email-address"
                    onBlur={() => {
                        validEmail()
                    }}
                    onChangeText={async value => {
                        await setEmail(value)
                        await saveEmailInCache(value, cache)
                        await isValidEmail(value, setDisabled)
                    }}
                    style={{ backgroundColor: 'white', height: 45 }}
                    theme={{ colors: { primary: 'black' } }}
                    value={email}
                />
            </ContentContainer>
            <SnackBarContainer>
                {visible && <SnackBar backgroundColor={theme.colors.danger50} message={error} setVisible={setVisible} />}
            </SnackBarContainer>
        </>
    )
}
