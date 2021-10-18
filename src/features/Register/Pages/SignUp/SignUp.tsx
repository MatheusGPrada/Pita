import { DarkTemplate } from '@components/templates/DarkTemplate/DarkTemplate'
import React, { useState, FC, useEffect } from 'react'
import { PhoneNumber } from '../PhoneNumber/PhoneNumber'
import { UserInfo } from '../UserInfo/UserInfo'
import { Cache } from 'react-native-cache'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'
import { i18n } from '@i18n'
import { validAllInfo } from '../UserInfo/utils'
import { SnackBar } from '@components/atoms/SnackBar/SnackBar'
import { theme } from '@theme'

export const SignUp: FC = () => {
    const [cache, setCache] = useState()
    const [disabled, setDisabled] = useState(false)
    const [visible, setVisible] = useState(false)
    const [message, setMessage] = useState('')

    const onToggleSnackBar = () => setVisible(true)

    const createCache = async () => {
        setCache(
            new Cache({
                backend: AsyncStorage,
                namespace: 'Pita',
                policy: {
                    maxEntries: 50000,
                },
            }),
        )
    }

    useEffect(() => {
        createCache()
    }, [])

    return (
        <DarkTemplate>
            <ProgressSteps>
                <ProgressStep
                    errors={disabled}
                    label={i18n.t('steps.personalData')}
                    onNext={async () => {
                        const {
                            Name: { value: name },
                            CPF: { value: cpf },
                            BirthDate: { value: birthDate },
                        } = await cache.getAll()
                        console.debug('Teste', { birthDate, cpf, name })
                        if (!(await validAllInfo(name, cpf, birthDate))) {
                            await setDisabled(true)
                            await setMessage(i18n.t('error.invalidData'))
                            await onToggleSnackBar()
                        } else {
                            await setDisabled(false)
                        }
                    }}
                >
                    <UserInfo cache={cache} />
                </ProgressStep>
                <ProgressStep label={i18n.t('steps.phoneNumber')}>
                    <PhoneNumber cache={cache} />
                </ProgressStep>
            </ProgressSteps>
            {visible && <SnackBar backgroundColor={theme.colors.danger50} message={message} setVisible={setVisible} />}
        </DarkTemplate>
    )
}
