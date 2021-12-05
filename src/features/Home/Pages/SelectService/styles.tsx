import { theme } from '@theme'
import styled from 'styled-components/native'

export const Title = styled.Text`
    color: ${theme.colors.white};
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.xxLarge};
    text-align: center;
`
export const Content = styled.View`
    flex: 1;
    padding: ${theme.marginsPx.m16px} ${theme.marginsPx.m20px};
`

export const LoadingContainer = styled.View`
    align-items: center;
    flex: 1;
    justify-content: center;
`

export const CardService = styled.View`
    justify-content: center;
    align-items: flex-start;
    margin-left: ${theme.marginsPx.m16px};
`

export const IconContainer = styled.View`
    align-self: center;
    align-items: flex-end;
    flex: 1;
`

export const Card = styled.View`
    flex-direction: row;
    background-color: ${({ status }) => (status ? `#e3d0d8` : `#758bfd`)};
    border-radius: 30px;
    margin-horizontal: ${theme.marginsPx.m16px};
    margin-top: ${theme.marginsPx.m20px};
    padding: ${theme.marginsPx.m20px};
    align-items: flex-start;
`

export const CardInfo = styled.View`
    flex-direction: row;
`

export const ServiceTitle = styled.Text`
    color: ${theme.colors.black100};
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.large};
    text-align: center;
`

export const ServiceInfo = styled.Text`
    margin-top: ${theme.marginsPx.m12px};
    color: ${theme.colors.black100};
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.medium};
    text-align: center;
    margin-right: ${theme.marginsPx.m8px};
`
