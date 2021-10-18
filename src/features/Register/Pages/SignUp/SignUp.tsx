import { DarkTemplate } from '@components/templates/DarkTemplate/DarkTemplate'
import React, { useState, FC, useEffect } from 'react'
import Stepper from 'react-native-stepper-ui'
import { PhoneNumber } from '../PhoneNumber/PhoneNumber'
import { UserInfo } from '../UserInfo/UserInfo'
import { Cache } from 'react-native-cache'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const SignUp: FC = () => {
    const [cache, setCache] = useState(0)
    const [active, setActive] = useState(0)

    const content = [<UserInfo cache={cache} key={'UserInfo'} />, <PhoneNumber cache={cache} key={'UserInfo'} />]

    useEffect(() => {
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
        createCache()
    }, [])

    return (
        <DarkTemplate>
            <Stepper
                active={active}
                content={content}
                onBack={() => setActive(index => index - 1)}
                onFinish={() => alert('Finish')}
                onNext={() => setActive(index => index + 1)}
            />
        </DarkTemplate>
    )
}
