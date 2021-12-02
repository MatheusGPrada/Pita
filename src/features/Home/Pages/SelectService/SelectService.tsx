import React, { FC } from 'react'
import { useRoute } from '@react-navigation/native'
import { DarkTemplate } from '@components/templates/DarkTemplate/DarkTemplate'
import { Title } from './styles'
import { i18n } from '@i18n'

export const SelectService: FC = () => {
    const {
        params: { token },
    } = useRoute()

    console.debug('token', token)

    return (
        <DarkTemplate>
            <Title>{i18n.t('title.selectServices')}</Title>
        </DarkTemplate>
    )
}
