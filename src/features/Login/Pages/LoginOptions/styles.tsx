import styled from 'styled-components/native'
import { theme } from '../../../../styles/theme'

export const Image = styled.Image`
    flex: 1;
    width: 300px;
    height: 300px;
    align-self: center;
`

export const HeaderContainer = styled.View`
    flex: 1;
    flex-direction: row;
`

export const StyledText = styled.Text`
    color: ${theme.colors.white};
    text-align: center;
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSize.large};
    align-self: flex-end;
`

export const TextContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin: 0 ${theme.marginsPx.m60px} ${theme.marginsPx.m20px};
`

export const LineSeparator = styled.View`
    align-self: center;
    background-color: ${theme.colors.grayscale50};
    height: 1;
    width: 40%;
`

export const LineSeparatorContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: ${theme.marginsPx.m20px};
`

export const StyledLabel = styled.Text`
    color: ${theme.colors.grayscale60};
    text-align: center;
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSize.large};
    align-self: center;
`
