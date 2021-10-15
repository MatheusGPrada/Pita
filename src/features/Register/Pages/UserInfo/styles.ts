import { theme } from '../../../../../src/styles/theme'
import styled from 'styled-components/native'

export const HeaderContent = styled.View`
    margin: ${theme.marginsPx.m100px} 0;
    padding: ${theme.marginsPx.m8px};
`

export const Title = styled.Text`
    color: ${theme.colors.white};
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSize.xxxLarge};
    font-style: normal;
    font-weight: 300;
    margin-bottom: ${theme.marginsPx.m12px};
`

export const Subtitle = styled.Text`
    color: ${theme.colors.white};
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSize.large};
    font-style: normal;
    font-weight: 300;
`

export const InputContainer = styled.View`
    margin: 0 ${theme.marginsPx.m40px} ${theme.marginsPx.m32px};
`

export const ContentContainer = styled.View`
    flex: 1;
`
