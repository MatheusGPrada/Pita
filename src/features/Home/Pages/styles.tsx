import styled from 'styled-components/native'
import { theme } from '../../../styles/theme'

export const FullSizeBgColor = styled.View`
    flex: 1;
    background-color: white;
`

export const ProfileHeader = styled.View`
    align-self: flex-start;
    flex-direction: row;
    margin: ${theme.marginsPx.m32px} 0 ${theme.marginsPx.m16px} 0;
`

export const UserName = styled.Text`
    color: black;
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.xLarge};
    letter-spacing: ${theme.letterSpacing.ls08};
    align-self: center;
    left: ${theme.marginsPx.m20px};
`

export const ProfileContent = styled.View`
    flex: 1;
    margin-right: ${theme.marginsPx.m20px};
    margin-top: ${theme.marginsPx.m60px};
`

export const ButtonContainer = styled.View`
    margin-top: ${theme.marginsPx.m32px};
`

export const Footer = styled.View`
    justify-content: center;
    margin-bottom: ${theme.marginsPx.m16px};
`

export const ContentTitle = styled.Text`
    color: black;
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.xLarge};
    letter-spacing: ${theme.letterSpacing.ls08};
    align-self: flex-start;
    left: ${theme.marginsPx.m20px};
`
