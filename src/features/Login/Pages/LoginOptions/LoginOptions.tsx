import { DarkTemplate } from '@components/templates/DarkTemplate/DarkTemplate'
import { i18n } from '@i18n'
import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import { Image, StyledText, TextContainer, LineSeparator, LineSeparatorContainer, StyledLabel } from './styles'

export const LoginOptions: FC = () => {
    const { navigate } = useNavigation()

    return (
        <DarkTemplate>
            <Image resizeMode="contain" source={require('../../../../assets/images/pita.png')} />
            <TextContainer>
                <StyledText onPress={() => navigate('RegisterStack', { screen: 'SignUp' })}>{i18n.t('labels.register')}</StyledText>
                <StyledText onPress={() => navigate('Login')}>{i18n.t('labels.login')}</StyledText>
            </TextContainer>
            <LineSeparatorContainer>
                <LineSeparator />
                <StyledLabel>{i18n.t('labels.or')}</StyledLabel>
                <LineSeparator />
            </LineSeparatorContainer>
        </DarkTemplate>
    )
}
