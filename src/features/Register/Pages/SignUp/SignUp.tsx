import React, { useState, FC } from 'react'
import Stepper from 'react-native-stepper-ui'
import { DarkTemplate } from '../../../../../src/components/templates/DarkTemplate/DarkTemplate'
import { UserInfo } from '../UserInfo/UserInfo'

export const SignUp: FC = () => {
    const [active, setActive] = useState(0)
    const [showNext, setShowNext] = useState(false)

    const content = [<UserInfo setShowNext={setShowNext} />]
    return (
        <DarkTemplate>
            <Stepper
                active={active}
                content={content}
                onBack={() => setActive(p => p - 1)}
                onFinish={() => alert('Finish')}
                onNext={() => setActive(p => p + 1)}
                showButton={showNext}
            />
        </DarkTemplate>
    )
}
