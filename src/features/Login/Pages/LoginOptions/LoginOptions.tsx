import React, { FC } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { theme } from '../../../../styles/theme'
import { SafeAreaView, StatusBar } from 'react-native'
import { Content } from '../../../../components/utils/Screen'
import { Image, StyledText, TextContainer, LineSeparator, LineSeparatorContainer, StyledLabel } from './styles'
import { Button } from '../../../../components/atoms/Button'
import { i18n } from '../../../../_translate/i18n'
import { useNavigation } from '@react-navigation/native'

Icon.loadFont()

export const LoginOptions: FC = () => {
    const { navigate } = useNavigation()

    return (
        <SafeAreaView style={{ backgroundColor: theme.colors.black100, flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <Content>
                <Image resizeMode="contain" source={require('../../../../assets/images/pita.png')} />
                <TextContainer>
                    <StyledText onPress={() => navigate('')}>{i18n.t('labels.register')}</StyledText>
                    <StyledText onPress={() => navigate('Login')}>{i18n.t('labels.login')}</StyledText>
                </TextContainer>
                <LineSeparatorContainer>
                    <LineSeparator />
                    <StyledLabel>{i18n.t('labels.or')}</StyledLabel>
                    <LineSeparator />
                </LineSeparatorContainer>
                <Button disabled={false} label={i18n.t('buttonLabels.loginWithFacebook')}>
                    <Icon color="white" name="facebook-square" size={theme.size.m36} />
                </Button>
            </Content>
        </SafeAreaView>
    )
}
