import React, { FC, useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { ContentContainer, HeaderContent, Subtitle, InputText } from './styles'
import { TextInput } from 'react-native-paper'
import { SnackBar } from '@components/atoms/SnackBar/SnackBar'
import { DarkTemplate } from '@components/templates/DarkTemplate/DarkTemplate'
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
        if (phoneNumber.length === 15) {
            //setShowNext(true)
        }
    }

    useEffect(() => {
        // const getCache = async () => console.debug('Matheus', await cache.getAll())
        // getCache()
    }, [cache])

    return (
        <DarkTemplate>
            <HeaderContent>
                <Subtitle>{i18n.t('subtitle.phoneNumber')}</Subtitle>
            </HeaderContent>
            <ContentContainer>
                <InputText>{i18n.t('labels.cellphone')}</InputText>
                <TextInput
                    onBlur={() => {
                        validPhoneNumber()
                    }}
                    onChangeText={setPhoneNumber}
                    onFocus={() => {}}
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
                    style={{ backgroundColor: theme.colors.lightGrey, height: 55 }}
                    theme={{ colors: { primary: 'black' } }}
                    value={phoneNumber}
                />
            </ContentContainer>
            {visible && <SnackBar backgroundColor={theme.colors.danger50} message={error} setVisible={setVisible} />}
        </DarkTemplate>
    )
}
