import React, { FC } from 'react'
import { Content } from '../styles'
import { SafeAreaView, StatusBar } from 'react-native'
import { TemplateProps } from '../typings'

export const LightTemplate: FC<TemplateProps> = ({ children }) => (
    <>
        <SafeAreaView style={{ backgroundColor: 'white', flex: 0 }} />
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <Content>{children}</Content>
        </SafeAreaView>
    </>
)
