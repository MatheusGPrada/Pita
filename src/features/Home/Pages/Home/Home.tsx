import React, { FC } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { BottomNavigation } from 'react-native-paper'
import { ProfileHeader, ProfileContent, UserName, FullSizeBgColor, Footer, ButtonContainer, ContentTitle } from './styles'
import { SafeAreaView, StatusBar } from 'react-native'
import { Button } from '../../../../components/atoms/Button'
import { i18n } from '../../../../_translate/i18n'
import { useNavigation } from '@react-navigation/native'
import { theme } from '../../../../styles/theme'

Icon.loadFont()

export const Home: FC = () => {
    const { navigate } = useNavigation()

    const [index, setIndex] = React.useState(0)
    const [routes] = React.useState([
        { icon: props => <Icon color="white" name="bookmark-check" size={36} {...props} />, key: 'schedule' },
        { icon: props => <Icon color="white" name="account-box" size={36} {...props} />, key: 'account' },
    ])

    const AccountRoute = () => (
        <FullSizeBgColor>
            <ProfileHeader>
                <Icon color="black" name="account-circle" size={100} />
                <UserName>Matheus Prada</UserName>
            </ProfileHeader>
            <ProfileContent>
                <ContentTitle>{i18n.t('title.changeProfileData')}</ContentTitle>
                <ButtonContainer>
                    <Button label={i18n.t('buttonLabels.changeName')} useButtonContainer={true} variant={'terciary'}>
                        <Icon color="black" name="account" size={36} />
                    </Button>
                </ButtonContainer>
                <ButtonContainer>
                    <Button label={i18n.t('buttonLabels.changeEmail')} useButtonContainer={true} variant={'terciary'}>
                        <Icon color="black" name="email" size={36} />
                    </Button>
                </ButtonContainer>
                <ButtonContainer>
                    <Button label={i18n.t('buttonLabels.changeCellphone')} useButtonContainer={true} variant={'terciary'}>
                        <Icon color="black" name="cellphone-basic" size={36} />
                    </Button>
                </ButtonContainer>
                <ButtonContainer>
                    <Button label={i18n.t('buttonLabels.changePassword')} useButtonContainer={true} variant={'terciary'}>
                        <Icon color="black" name="lock" size={36} />
                    </Button>
                </ButtonContainer>
            </ProfileContent>
            <Footer>
                <Button label={i18n.t('buttonLabels.logout')} labelSize="large" onPress={() => doLogOut()} useButtonContainer={true} />
            </Footer>
        </FullSizeBgColor>
    )

    const ScheduleRoute = () => <FullSizeBgColor />

    const renderScene = BottomNavigation.SceneMap({
        account: AccountRoute,
        schedule: ScheduleRoute,
    })

    const doLogOut = () => {
        navigate('LoginOptions')
    }

    return (
        <>
            <SafeAreaView style={{ backgroundColor: 'white', flex: 0 }} />
            <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <BottomNavigation
                    barStyle={{ backgroundColor: '#000000' }}
                    labeled={false}
                    navigationState={{ index, routes }}
                    onIndexChange={setIndex}
                    renderScene={renderScene}
                />
            </SafeAreaView>
        </>
    )
}
