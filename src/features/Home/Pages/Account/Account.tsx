import React from 'react'
import { ProfileHeader, ProfileContent, UserName, FullSizeBgColor, Footer, ButtonContainer, ContentTitle } from '../styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { LOGIN_STACK } from '@routes/Contants'
import { Button } from '@components/atoms/Button/Button'
import { i18n } from '@i18n'

Icon.loadFont()

export const Account = () => {
    const { navigate, reset } = useNavigation()

    const doLogOut = () => {
        navigate('LoginStack', { screen: 'LoginOptions' })
        reset({
            index: 0,
            routes: [{ name: LOGIN_STACK }],
        })
    }

    return (
        <FullSizeBgColor>
            <ProfileHeader>
                <Icon color="black" name="account-circle" size={100} />
                <UserName>Matheus Prada</UserName>
            </ProfileHeader>
            <ProfileContent>
                <ContentTitle>{i18n.t('title.changeProfileData')}</ContentTitle>
                <ButtonContainer>
                    <Button label={i18n.t('buttonLabels.changeName')} useButtonContainer={true} variant={'tertiary'}>
                        <Icon color="black" name="account" size={36} />
                    </Button>
                </ButtonContainer>
                <ButtonContainer>
                    <Button label={i18n.t('buttonLabels.changeEmail')} useButtonContainer={true} variant={'tertiary'}>
                        <Icon color="black" name="email" size={36} />
                    </Button>
                </ButtonContainer>
                <ButtonContainer>
                    <Button label={i18n.t('buttonLabels.changeCellphone')} useButtonContainer={true} variant={'tertiary'}>
                        <Icon color="black" name="cellphone-basic" size={36} />
                    </Button>
                </ButtonContainer>
                <ButtonContainer>
                    <Button label={i18n.t('buttonLabels.changePassword')} useButtonContainer={true} variant={'tertiary'}>
                        <Icon color="black" name="lock" size={36} />
                    </Button>
                </ButtonContainer>
            </ProfileContent>
            <Footer>
                <Button label={i18n.t('buttonLabels.logout')} labelSize="large" onPress={() => doLogOut()} useButtonContainer={true} />
            </Footer>
        </FullSizeBgColor>
    )
}
