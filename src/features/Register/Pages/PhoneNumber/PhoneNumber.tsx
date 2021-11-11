import React, { FC, useState, useEffect } from 'react'
import { ContentContainer, HeaderContent, Subtitle, InputText, SnackBarContainer, Title } from './styles'
import { TextInput } from 'react-native-paper'
import { SnackBar } from '@components/atoms/SnackBar/SnackBar'
import { i18n } from '@i18n'
import { theme } from '@theme'
import { TextInputMask } from 'react-native-masked-text'
import { isValidPhoneNumber, savePhoneNumberInCache } from '@features/Register/Utils/utils'

export const PhoneNumber: FC = ({ cache, setDisabled }) => {
    const [visible, setVisible] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [error, setError] = useState('')

    const onToggleSnackBar = () => setVisible(true)

    const validPhone = async () => {
        await cache.set('PhoneNumber', phoneNumber)
        if (!(await isValidPhoneNumber(phoneNumber, setDisabled))) {
            await setError(i18n.t('error.invalidPhoneNumber'))
            await onToggleSnackBar()
        }
    }

    useEffect(() => {
        isValidPhoneNumber(phoneNumber, setDisabled)
    }, [])

    return (
        <>
            <HeaderContent>
                <Title>{i18n.t('title.cellphone')}</Title>
                <Subtitle>{i18n.t('subtitle.insertPhoneNumber')}</Subtitle>
            </HeaderContent>
            <ContentContainer>
                <InputText>{i18n.t('labels.cellphone')}</InputText>
                <TextInput
                    onBlur={() => validPhone()}
                    onChangeText={async value => {
                        await setPhoneNumber(value)
                        await savePhoneNumberInCache(value, cache)
                        await isValidPhoneNumber(phoneNumber, setDisabled)
                    }}
                    render={props => (
                        <TextInputMask
                            {...props}
                            keyboardType="numeric"
                            options={{
                                dddMask: '(99) ',
                                maskType: 'BRL',
                                withDDD: true,
                            }}
                            type={'cel-phone'}
                        />
                    )}
                    style={{ backgroundColor: 'rgb(255, 255, 255)', height: 45 }}
                    theme={{ colors: { primary: 'black' } }}
                    value={phoneNumber}
                />
            </ContentContainer>
            <SnackBarContainer>
                {visible && <SnackBar backgroundColor={theme.colors.danger50} message={error} setVisible={setVisible} />}
            </SnackBarContainer>
        </>
    )
}
