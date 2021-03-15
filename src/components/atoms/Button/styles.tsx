import styled from 'styled-components/native'
import { BUTTON_STYLE } from './constants'
import { ButtonProps } from './typings'
import { theme } from '../../../../src/styles/theme'

export const Container = styled.TouchableHighlight<ButtonProps>`
    align-items: center;
    background-color: ${({ disabled, variant }) => (disabled ? 'gray' : variant === 'primary' ? 'blue' : 'white')};
    border-color: ${({ disabled, variant }) => (disabled ? 'gray' : variant === 'primary' ? 'blue' : 'white')};
    border-radius: ${BUTTON_STYLE.borderRadius};
    border-width: ${BUTTON_STYLE.borderWidth};
    flex-direction: row;
    height: ${BUTTON_STYLE.height};
    justify-content: center;
    margin-left: ${theme.margins.m40};
    margin-right: ${theme.margins.m40};
`

export const Content = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const Text = styled.Text<ButtonProps>`
    color: ${({ disabled, variant }) => (disabled ? 'gray' : variant === 'primary' ? 'white' : 'blue')};
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${({ labelSize }) => (labelSize === 'medium' ? theme.fontSize.medium : theme.fontSize.large)};
    letter-spacing: ${BUTTON_STYLE.letterSpacing};
    line-height: ${BUTTON_STYLE.lineHeight};
    padding-horizontal: ${theme.marginsPx.m8px};
`
