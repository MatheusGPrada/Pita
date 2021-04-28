import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { Platform } from 'react-native'
import { HomeStackParamList } from './typings/home'
import { Home } from '../features/Home/Pages/Home/Home'

const { Navigator, Screen } = createStackNavigator<HomeStackParamList>()

export const HomeStack = () => (
    <Navigator
        screenOptions={{
            // headerBackImage: () => <HeaderBackIcon addScreenNameTestId isArrow />,
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
        <Screen component={Home} name="Home" options={{ headerShown: false }} />
    </Navigator>
)
