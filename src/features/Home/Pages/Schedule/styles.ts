import styled from 'styled-components/native'
import { theme } from '../../../../styles/theme'

export const AttendanceHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: ${theme.marginsPx.m16px};
`

export const Attendance = styled.Text`
    color: #000000;
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSize.large};
    padding-bottom: ${theme.marginsPx.m8px};
    padding-left: ${theme.marginsPx.m16px};
    align-self: flex-start;
`

export const Day = styled.Text`
    color: #000000;
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.xxLarge};
    padding-left: ${theme.marginsPx.m16px};
`

export const Time = styled.Text`
    color: #000000;
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.xxLarge};
    padding-right: ${theme.marginsPx.m16px};
`

export const AttendanceContainer = styled.View`
    background-color: #ffd6a5;
    border-radius: 10px;
    margin-top: ${theme.marginsPx.m16px};
    padding-bottom: ${theme.marginsPx.m16px};
    padding-top: ${theme.marginsPx.m16px};
`

export const Title = styled.Text`
    color: ${theme.colors.black100};
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.xxxLarge};
    margin-bottom: ${theme.marginsPx.m20px};
`

export const SubTitle = styled.Text`
    color: ${theme.colors.black100};
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.xLarge};
    margin-top: ${theme.marginsPx.m20px};
    margin-bottom: ${theme.marginsPx.m20px};
`

export const Center = styled.View`
    align-self: center;
    justify-content: center;
    flex: 1;
`

export const ContentHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
`

export const ButtonContainer = styled.View`
    margin-top: ${theme.marginsPx.m16px};
`
