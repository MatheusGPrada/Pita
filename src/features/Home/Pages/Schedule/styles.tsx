import styled from 'styled-components/native'
import { theme } from '../../../../styles/theme'

export const AttendanceHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding-top: ${theme.marginsPx.m16px};
`

export const Attendance = styled.Text`
    color: ${theme.colors.black100};
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.large};
    padding-top: ${theme.marginsPx.m8px};
    padding-left: ${theme.marginsPx.m16px};
    align-self: flex-start;
`

export const Day = styled.Text`
    color: ${theme.colors.black100};
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.xxLarge};
    padding-left: ${theme.marginsPx.m16px};
    align-self: flex-start;
`

export const Time = styled.Text`
    color: ${theme.colors.black100};
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.xxLarge};
    padding-right: ${theme.marginsPx.m16px};
    align-self: flex-start;
`

export const AttendanceContainer = styled.View`
    flex: 1;
    background-color: #c9bdbd;
    margin: ${theme.marginsPx.m16px} ${theme.marginsPx.m16px};
`
