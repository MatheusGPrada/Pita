import styled from '../../../../node_modules/styled-components';
import { theme } from '../../../styles/theme';

export const ForgotPassword = styled.Text`
    color: blue;
    text-align: center;
    text-decoration: underline;
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSize.small};
    padding-bottom: ${theme.marginsPx.m28px};
    text-decoration-color: ${theme.colors.primary60};
`;
