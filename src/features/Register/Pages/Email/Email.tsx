import React, { FC, useState } from 'react'
import { ContentContainer, HeaderContent, Subtitle, InputText, SnackBarContainer, Title } from './styles'
import { TextInput } from 'react-native-paper'
import { SnackBar } from '@components/atoms/SnackBar/SnackBar'
import { i18n } from '@i18n'
import { theme } from '@theme'

export const Email: FC = ({ cache, setDisabled }) => {
    const [visible, setVisible] = useState(false)
    // const [email, setEmail] = useState('matheus@gmail.com')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const validEmailRegex = /\S+@\S+\.\S+/

    const onToggleSnackBar = () => setVisible(true)

    const validEmail = () => {
        cache.set('Email', email)
        if (!validEmailRegex.test(email)) {
            setError(i18n.t('error.invalidEmail'))
            onToggleSnackBar()
        }
    }

    // useEffect(() => {
    //     const getCache = async () => console.debug('Matheus', await cache.getAll())
    //     getCache()
    // }, [cache])

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
                    onChangeText={setEmail}
                    style={{ backgroundColor: 'rgb(255, 255, 255)', height: 45 }}
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
