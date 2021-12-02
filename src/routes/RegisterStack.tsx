import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { Platform } from 'react-native'
import { UserInfo } from '@features/Register/Pages/UserInfo/UserInfo'
import { RegisterStackParamList } from './typings/register'
import { SignUp } from '@features/Register/Pages/SignUp/SignUp'
import { PhoneNumber } from '@features/Register/Pages/PhoneNumber/PhoneNumber'
import { Email } from '@features/Register/Pages/Email/Email'

const { Navigator, Screen } = createStackNavigator<RegisterStackParamList>()

export const RegisterStack = () => (
    <Navigator
        screenOptions={{
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
        <Screen component={SignUp} name="SignUp" options={{ headerShown: false }} />
        <Screen component={PhoneNumber} name="PhoneNumber" options={{ headerShown: false }} />
        <Screen component={Email} name="Email" options={{ headerShown: false }} />
    </Navigator>
)
