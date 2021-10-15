import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { MainStackParamList } from './typings/main'

import { LoginStack } from './LoginStack'
import { NavigationContainer } from '@react-navigation/native'
import { theme } from '../styles/theme'
import { HomeStack } from './HomeStack'
import { RegisterStack } from './RegisterStack'

const { Navigator, Screen } = createStackNavigator<MainStackParamList>()

export const MainStack = () => (
    <NavigationContainer theme={theme}>
        <Navigator
            initialRouteName="LoginStack"
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >
            <Screen component={LoginStack} name="LoginStack" />
            <Screen component={HomeStack} name="HomeStack" />
            <Screen component={RegisterStack} name="RegisterStack" />
        </Navigator>
    </NavigationContainer>
)
