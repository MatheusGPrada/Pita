import { ReactNode } from 'react'

export interface ButtonProps {
    children: ReactNode
    disabled?: boolean
    label?: string
    labelSize?: string
    loading?: boolean
    variant?: 'primary' | 'secondary' | 'tertiary'
    hideText?: boolean
    loadingIsBlue?: boolean
    showIconBeforeText?: boolean
    useButtonContainer?: boolean
}
