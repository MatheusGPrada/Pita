import styled from 'styled-components/native'
import { theme } from '../../../../styles/theme'

export const ModalTitle = styled.Text`
    color: ${theme.colors.white};
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.xLarge};
    letter-spacing: ${theme.letterSpacing.ls08};
    align-self: center;
`

export const ModalSubtitle = styled.Text`
    color: ${theme.colors.white};
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSize.large};
    letter-spacing: ${theme.letterSpacing.ls08};
    align-self: center;
    margin-top: ${theme.marginsPx.m8px};
`

export const ButtonContainer = styled.View`
    flex-direction: row;
`

export const ButtonContent = styled.View`
    flex: 1;
    margin: ${theme.marginsPx.m40px} ${theme.marginsPx.m20px};
`
