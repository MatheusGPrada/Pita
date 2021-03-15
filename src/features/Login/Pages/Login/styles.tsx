import styled from 'styled-components/native'
import { theme } from '../../../../styles/theme'

export const Image = styled.Image`
    align-self: center;
    flex: 1;
    justify-content: center;
    max-height: 230px;
    max-width: 230px;
`
export const ImageContainer = styled.View`
    align-self: center;
    max-width: 280;
    max-height: 280;
    margin-bottom: ${theme.marginsPx.m20px};
    margin-top: ${theme.marginsPx.m40px};
`

export const StyledText = styled.Text`
    color: ${theme.colors.danger50};
    text-align: center;
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSize.medium};
    align-self: center;
    margin-bottom: ${theme.marginsPx.m32px};
`
