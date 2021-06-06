import React, { FC } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { BottomNavigation } from 'react-native-paper'
import { SafeAreaView, StatusBar } from 'react-native'
import { Account } from '../Account/Account'
import { Schedule } from '../Schedule/Schedule'

Icon.loadFont()

export const Home: FC = () => {
    const [index, setIndex] = React.useState(0)
    const [routes] = React.useState([
        { icon: props => <Icon color="white" name="bookmark-check" size={36} {...props} />, key: 'schedule' },
        { icon: props => <Icon color="white" name="account-box" size={36} {...props} />, key: 'account' },
    ])

    const renderScene = BottomNavigation.SceneMap({
        account: Account,
        schedule: Schedule,
    })

    return (
        <>
            <SafeAreaView style={{ backgroundColor: 'white', flex: 0 }} />
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <BottomNavigation
                    barStyle={{ backgroundColor: 'white' }}
                    labeled={false}
                    navigationState={{ index, routes }}
                    onIndexChange={setIndex}
                    renderScene={renderScene}
                    shifting={true}
                />
            </SafeAreaView>
        </>
    )
}
