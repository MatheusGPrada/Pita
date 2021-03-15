import styled from '../../../../node_modules/styled-components'
import { theme } from '../../../styles/theme'

export const ForgotPassword = styled.Text`
    color: ${theme.colors.white};
    text-align: center;
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSize.medium};
    padding-top: ${theme.marginsPx.m8px};
    text-decoration-color: ${theme.colors.primary60};
    align-self: flex-end;
`
