import styled from 'styled-components/native'
import { theme } from '../../../../styles/theme'

export const ContentContainer = styled.View`
    padding: ${theme.marginsPx.m16px};
`

export const Title = styled.Text`
    color: #fff;
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.xxLarge};
    margin-bottom: ${theme.marginsPx.m40px};
`

export const TimeContainer = styled.View`
    margin: ${theme.marginsPx.m8px} ${theme.marginsPx.m40px};
    background-color: ${theme.colors.primary50};
    border-radius: 20px;
`

export const Time = styled.Text`
    color: #fff;
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.xxLarge};
    padding: ${theme.marginsPx.m8px};
    text-align: center;
`
