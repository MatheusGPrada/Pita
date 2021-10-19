import React, { FC } from 'react'
import { Content } from '../styles'
import { SafeAreaView, StatusBar } from 'react-native'
import { TemplateProps } from '../typings'

export const DarkTemplate: FC = ({ children, hasMargin = true }: TemplateProps) => (
    <>
        <SafeAreaView style={{ backgroundColor: 'black', flex: 0 }} />
        <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
            <StatusBar backgroundColor="black" barStyle="light-content" />
            <Content hasMargin={hasMargin}>{children}</Content>
        </SafeAreaView>
    </>
)
