import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { Platform } from 'react-native'
import { UserInfo } from '../features/Register/Pages/UserInfo/UserInfo'
import { RegisterStackParamList } from './typings/register'

const { Navigator, Screen } = createStackNavigator<RegisterStackParamList>()

export const RegisterStack = () => (
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
        <Screen component={UserInfo} name="UserInfo" options={{ headerShown: false }} />
    </Navigator>
)
