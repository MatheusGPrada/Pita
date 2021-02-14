import { ReactNode } from 'react';

export interface ButtonProps {
    children: ReactNode;
    disabled?: boolean;
    label?: string;
    loading?: boolean;
    variant?: 'primary' | 'secondary';
    hideText?: boolean;
    loadingIsBlue?: boolean;
}
