import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { Platform } from 'react-native'
import { HomeStackParamList } from './typings/home'
import { Home } from '../features/Home/Pages/Home/Home'
import { HOME } from './routeNames/HomeStack'
import { Account } from '@features/Home/Pages/Account/Account'
import { Schedule } from '@features/Home/Pages/Schedule/Schedule'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { SelectService } from '@features/Home/Pages/SelectService/SelectService'

AntDesign.loadFont()

const { Navigator, Screen } = createStackNavigator<HomeStackParamList>()

export const HomeStack = ({ route: { params } }) => (
    <Navigator
        initialRouteName={HOME}
        screenOptions={{
            headerBackImage: () => <AntDesign color="white" name="arrowleft" size={40} />,
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: 'black',
                elevation: 0,
                height: Platform.OS === 'android' ? 56 : 96,
                shadowOpacity: 0,
            },
            headerTitle: '',
            ...TransitionPresets.SlideFromRightIOS,
        }}
    >
        <Screen component={Home} initialParams={params} name="Home" options={{ headerShown: false }} />
        <Screen component={Account} initialParams={params} name="Account" options={{ headerShown: false }} />
        <Screen component={Schedule} initialParams={params} name="Schedule" options={{ headerShown: false }} />
        <Screen component={SelectService} name="SelectService" options={{ headerShown: true }} />
    </Navigator>
)
