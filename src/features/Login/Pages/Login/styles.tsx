import styled from 'styled-components/native'
import { theme } from '../../../../styles/theme'

export const ContainerWithMarginTop = styled.View`
    margin-top: ${theme.marginsPx.m8px};
`
export const Image = styled.Image`
    align-self: center;
    flex: 1;
    justify-content: center;
`
export const ImageContainer = styled.View`
    align-self: center;
    flex: 1;
    max-width: 280;
    max-height: 280;
    margin-bottom: ${theme.marginsPx.m40px};
`
