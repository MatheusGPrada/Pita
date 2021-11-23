import styled from 'styled-components/native'
import { theme } from '../../../styles/theme'

export const ChangeName = styled.Text`
    color: ${theme.colors.white};
    padding: ${theme.marginsPx.m40px} 0;
    font-size: ${theme.fontSize.xxLarge};
`

export const ModalHeader = styled.View`
    align-self: flex-end;
`
export const ModalContent = styled.View`
    margin: 0 ${theme.marginsPx.m20px};
`
export const SnackBarContainer = styled.View`
    flex: 1;
    background-color: red;
    margin-top: ${theme.marginsPx.m100px};
`
