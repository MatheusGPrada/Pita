import React, { FC } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { BottomNavigation } from 'react-native-paper'
import { SafeAreaView, StatusBar } from 'react-native'
import { Account } from '../Account/Account'
import { Schedule } from '../Schedule/Schedule'
import { useRoute } from '@react-navigation/native'

Icon.loadFont()

export const Home: FC = () => {
    const { params } = useRoute()

    console.debug('params', params)

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
            <StatusBar barStyle="light-content" />
            <BottomNavigation
                barStyle={{ backgroundColor: 'black', height: 70 }}
                labeled={false}
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                shifting={true}
            />
        </>
    )
}
