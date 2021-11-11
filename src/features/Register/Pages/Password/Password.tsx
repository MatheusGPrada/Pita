import React, { FC, useState, useEffect } from 'react'
import {
    ContentContainer,
    HeaderContent,
    Subtitle,
    InputText,
    SnackBarContainer,
    Title,
    Description,
    DescriptionContainer,
} from './styles'
import { TextInput } from 'react-native-paper'
import { SnackBar } from '@components/atoms/SnackBar/SnackBar'
import { i18n } from '@i18n'
import { theme } from '@theme'
import { isValidPassword, savePasswordInCache } from '@features/Register/Utils/utils'

export const Password: FC = ({ cache, setDisabled }) => {
    const [visible, setVisible] = useState(false)
    const [password, setPassword] = useState('M@th3us1')
    //const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const onToggleSnackBar = () => setVisible(true)

    const validPassword = async () => {
        cache.set('Password', password)
        if (!(await isValidPassword(password, setDisabled))) {
            setError(i18n.t('error.invalidPassword'))
            onToggleSnackBar()
        }
    }

    useEffect(() => {
        isValidPassword(password, setDisabled)
    }, [password, setDisabled])

    return (
        <>
            <HeaderContent>
                <Title>{i18n.t('title.password')}</Title>
                <Subtitle>{i18n.t('subtitle.insertPassword')}</Subtitle>
                <DescriptionContainer>
                    <Description>{i18n.t('descriptions.specialCharacter')}</Description>
                </DescriptionContainer>
                <DescriptionContainer>
                    <Description>{i18n.t('descriptions.number')}</Description>
                </DescriptionContainer>
                <DescriptionContainer>
                    <Description>{i18n.t('descriptions.capitalLetter')}</Description>
                </DescriptionContainer>
                <DescriptionContainer>
                    <Description>{i18n.t('descriptions.minimalLetters')}</Description>
                </DescriptionContainer>
            </HeaderContent>
            <ContentContainer>
                <InputText>{i18n.t('labels.password')}</InputText>
                <TextInput
                    onBlur={async () => {
                        await validPassword()
                    }}
                    onChangeText={async value => {
                        await setPassword(value)
                        await savePasswordInCache(value, cache)
                        await isValidPassword(value, setDisabled)
                    }}
                    style={{ backgroundColor: 'rgb(255, 255, 255)', height: 45 }}
                    theme={{ colors: { primary: 'black' } }}
                    value={password}
                />
            </ContentContainer>
            <SnackBarContainer>
                {visible && <SnackBar backgroundColor={theme.colors.danger50} message={error} setVisible={setVisible} />}
            </SnackBarContainer>
        </>
    )
}
