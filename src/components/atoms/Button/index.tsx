import React, { FC } from 'react'
import { Container, Text, Content } from './styles'
import { Loading } from '../../atoms/Loading'
import { ButtonProps } from './typings'

export const Button: FC<ButtonProps> = ({
    children,
    disabled = false,
    useButtonContainer = false,
    label,
    labelSize = 'medium',
    loading,
    loadingIsBlue,
    hideText,
    variant = 'primary',
    showIconBeforeText = true,
    ...props
}) => (
    <Container disabled={disabled} useButtonContainer={useButtonContainer} variant={variant} {...props}>
        <>
            {loading && <Loading isBlue={loadingIsBlue} />}
            <Content variant={variant}>
                {showIconBeforeText && children}
                {!hideText && (
                    <Text disabled={disabled} labelSize={labelSize} variant={variant}>
                        {label}
                    </Text>
                )}
                {!showIconBeforeText && children}
            </Content>
        </>
    </Container>
)
