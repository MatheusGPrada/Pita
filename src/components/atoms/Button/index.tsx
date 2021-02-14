import React, { FC } from 'react';
import { Container, Text, Content } from './styles';
import { Loading } from '../../atoms/Loading';
import { ButtonProps } from './typings';

export const Button: FC<ButtonProps> = ({
    children,
    disabled = false,
    label,
    loading,
    loadingIsBlue,
    hideText,
    variant = 'primary',
    ...props
}) => {
    return (
        <Container disabled={disabled} variant={variant} {...props}>
            <>
                {loading && <Loading isBlue={loadingIsBlue} />}
                <Content>
                    {children}
                    {!hideText && (
                        <Text disabled={disabled} variant={variant}>
                            {label}
                        </Text>
                    )}
                </Content>
            </>
        </Container>
    );
};
