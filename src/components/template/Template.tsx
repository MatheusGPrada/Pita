import React, { FC } from 'react'
import { Content } from './styles'
import { SafeAreaView, StatusBar } from 'react-native'
import { TemplateProps } from './typings'

export const Template: FC<TemplateProps> = ({ children, backgroundColor, statusBarColor, statusBarStyle }) => (
    <>
        <SafeAreaView style={{ flex: 0 }} />
        <SafeAreaView style={{ backgroundColor: backgroundColor, flex: 1 }}>
            <StatusBar backgroundColor={statusBarColor} barStyle={statusBarStyle} />
            <Content>{children}</Content>
        </SafeAreaView>
    </>
)
