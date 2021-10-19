import React, { FC, useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { ContentContainer, HeaderContent, Subtitle, InputText, SnackBarContainer, Title } from './styles'
import { TextInput } from 'react-native-paper'
import { SnackBar } from '@components/atoms/SnackBar/SnackBar'
import { i18n } from '@i18n'
import { theme } from '@theme'
import { TextInputMask } from 'react-native-masked-text'

Icon.loadFont()

export const PhoneNumber: FC = ({ cache }) => {
    const [visible, setVisible] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [error, setError] = useState('')

    const onToggleSnackBar = () => setVisible(true)

    const validPhoneNumber = () => {
        cache.set('PhoneNumber', phoneNumber)
        if (phoneNumber.length !== 15) {
            setError(i18n.t('error.invalidPhoneNumber'))
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
                <Title>{i18n.t('title.cellphone')}</Title>
                <Subtitle>{i18n.t('subtitle.insertPhoneNumber')}</Subtitle>
            </HeaderContent>
            <ContentContainer>
                <InputText>{i18n.t('labels.cellphone')}</InputText>
                <TextInput
                    onBlur={() => {
                        validPhoneNumber()
                    }}
                    onChangeText={setPhoneNumber}
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
