import styled from 'styled-components/native'
import { BUTTON_STYLE } from './constants'
import { ButtonProps } from './typings'
import { theme } from '../../../styles/theme'

export const Container = styled.TouchableHighlight<ButtonProps>`
    align-items: center;
    background-color: ${({ disabled, variant }) =>
        disabled ? '#e2dede' : variant === 'primary' ? 'blue' : variant === 'secondary' ? 'white' : 'white'};
    border-color: ${({ disabled, variant }) =>
        disabled ? '#e2dede' : variant === 'primary' ? 'blue' : variant === 'secondary' ? 'white' : 'black'};
    border-radius: ${BUTTON_STYLE.borderRadius};
    border-width: ${BUTTON_STYLE.borderWidth};
    flex-direction: row;
    height: ${BUTTON_STYLE.height};
    justify-content: center;
    margin-left: ${({ useButtonContainer }) => (useButtonContainer ? theme.margins.m40px : 0)};
    margin-right: ${({ useButtonContainer }) => (useButtonContainer ? theme.margins.m40px : 0)};
`

export const Content = styled.View`
    flex-direction: row;
    justify-content: ${({ variant }) => (variant !== 'tertiary' ? 'center' : 'flex-start')};
    align-items: center;
    ${({ variant }) => (variant !== 'tertiary' ? '' : 'flex: 1')};
    ${({ variant }) => (variant !== 'tertiary' ? '' : 'paddingLeft: 16px')};
`

export const Text = styled.Text<ButtonProps>`
    color: ${({ disabled, variant }) =>
        disabled ? '#887e7e' : variant === 'primary' ? 'white' : variant === 'secondary' ? 'blue' : 'black'};
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${({ labelSize }) => (labelSize === 'medium' ? theme.fontSize.medium : theme.fontSize.large)};
    letter-spacing: ${BUTTON_STYLE.letterSpacing};
    line-height: ${BUTTON_STYLE.lineHeight};
    padding-horizontal: ${theme.marginsPx.m8px};
`
