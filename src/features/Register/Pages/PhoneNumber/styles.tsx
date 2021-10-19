import { theme } from '../../../../../src/styles/theme'
import styled from 'styled-components/native'

export const HeaderContent = styled.View`
    margin-bottom: ${theme.marginsPx.m60px};
    padding: ${theme.marginsPx.m8px};
`

export const Title = styled.Text`
    color: ${theme.colors.white};
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSize.xxxLarge};
    font-style: normal;
    font-weight: 300;
    margin-bottom: ${theme.marginsPx.m4px};
`

export const Subtitle = styled.Text`
    color: ${theme.colors.white};
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSize.xLarge};
    font-style: normal;
    font-weight: 300;
`

export const InputText = styled.Text`
    color: ${theme.colors.white};
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSize.large};
    font-style: normal;
    font-weight: 300;
    margin-bottom: ${theme.marginsPx.m8px};
`

export const ContentContainer = styled.View`
    flex: 1;
    margin: ${theme.marginsPx.m60px} ${theme.marginsPx.m40px} ${theme.marginsPx.m100px};
`

export const SnackBarContainer = styled.View`
    flex: 1;
    background-color: red;
    margin-top: ${theme.marginsPx.m100px};
`
