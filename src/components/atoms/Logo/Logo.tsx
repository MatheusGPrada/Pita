import React, { FC } from 'react'
import { LogoProps } from './typings'
import { Image } from './styles'

export const Logo: FC<LogoProps> = ({ size = 32 }) => (
    <Image resizeMode="contain" size={size} source={require('../../../assets/images/logo.png')} />
)
