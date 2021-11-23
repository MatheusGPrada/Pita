import styled from 'styled-components/native'
import { theme } from '../../../styles/theme'

export const FullColor = styled.View`
    flex: 1;
    background-color: #000;
`

export const ScheduleContent = styled.View`
    margin: ${theme.marginsPx.m40px} ${theme.marginsPx.m16px} ${theme.marginsPx.m16px} ${theme.marginsPx.m16px};
    flex: 1;
    justify-content: center;
`

export const ProfileHeader = styled.View`
    align-self: flex-start;
    flex-direction: row;
    margin-top: ${theme.marginsPx.m100px};
    margin-left: ${theme.marginsPx.m16px};
`

export const UserName = styled.Text`
    color: ${theme.colors.white};
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.xxLarge};
    letter-spacing: ${theme.letterSpacing.ls08};
    align-self: center;
    left: ${theme.marginsPx.m20px};
`

export const ProfileContent = styled.View`
    flex: 1;
    margin-right: ${theme.marginsPx.m20px};
    margin-top: ${theme.marginsPx.m100px};
`

export const ButtonContainer = styled.View`
    margin-top: ${theme.marginsPx.m32px};
`

export const ContentTitle = styled.Text`
    color: ${theme.colors.white};
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.xLarge};
    letter-spacing: ${theme.letterSpacing.ls08};
    align-self: flex-start;
    left: ${theme.marginsPx.m20px};
`

export const UserAvatar = styled.View`
    background-color: #fff;
    border-radius: 100px;
`

export const UserLetter = styled.Text`
    padding: ${theme.marginsPx.m16px} ${theme.marginsPx.m20px};
    font-size: ${theme.fontSize.xxLarge};
`
