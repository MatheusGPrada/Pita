import styled, { css } from 'styled-components/native'
import { ContentProps } from '@components/templates/typings'
import { theme } from '@theme'

export const Content = styled.View`
    flex: 1;
    ${({ hasMargin }: ContentProps) =>
        hasMargin &&
        css`
            margin: ${theme.marginsPx.m32px} ${theme.marginsPx.m16px};
        `};
`
