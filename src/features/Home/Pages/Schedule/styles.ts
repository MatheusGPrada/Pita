import styled from 'styled-components/native'
import { theme } from '../../../../styles/theme'
import { AttendanceProps } from './typings'

export const AttendanceHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: ${theme.marginsPx.m16px};
`

export const ServiceContainer = styled.View`
    flex-direction: row;
    padding-bottom: ${theme.marginsPx.m4px};
    padding-left: ${theme.marginsPx.m16px};
`

export const Service = styled.Text`
    color: ${theme.colors.black100};
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSize.large};
    align-self: flex-start;
    padding-left: ${theme.marginsPx.m16px};
`

export const ServicePrice = styled.Text`
    color: ${theme.colors.black100};
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.medium};
    align-self: flex-start;
`

export const Day = styled.Text`
    color: #000000;
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSize.xLarge};
    padding-left: ${theme.marginsPx.m16px};
`

export const Time = styled.Text`
    color: #000000;
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSize.xLarge};
    padding-right: ${theme.marginsPx.m16px};
`

export const IconContainer = styled.View`
    align-items: center;
    justify-content: center;
`

export const AttendanceContainer = styled.View<AttendanceProps>`
    background-color: ${({ status }) => (status === 'ativo' ? `#758bfd` : `#e3d0d8`)};
    border-radius: 30px;
    margin-horizontal: ${theme.marginsPx.m16px};
    flex-direction: row;
    margin-top: ${theme.marginsPx.m20px};
    padding: ${theme.marginsPx.m20px};
`

export const SeeAllContainer = styled.View`
    align-items: flex-end;
    margin-bottom: ${theme.marginsPx.m20px};
`

export const Title = styled.Text`
    color: #fff;
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.xxLarge};
    margin-top: ${theme.marginsPx.m100px};
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

export const ButtonContainer = styled.View`
    margin-top: ${theme.marginsPx.m40px};
    border-radius: 30px;
`
export const CardContent = styled.View`
    flex: 1;
`
