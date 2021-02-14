import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { MainStackParamList } from './typings/main';

import { LoginStack } from './LoginStack';
import { NavigationContainer } from '@react-navigation/native';
import { Theme } from '../styles/theme';

const { Navigator, Screen } = createStackNavigator<MainStackParamList>();

export const MainStack = () => (
    <NavigationContainer theme={Theme}>
        <Navigator
            initialRouteName="LoginStack"
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >
            <Screen component={LoginStack} name="LoginStack" />
        </Navigator>
    </NavigationContainer>
);
