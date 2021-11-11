import { DarkTemplate } from '@components/templates/DarkTemplate/DarkTemplate'
import React, { useState, FC, useEffect } from 'react'
import { PhoneNumber } from '../PhoneNumber/PhoneNumber'
import { UserInfo } from '../UserInfo/UserInfo'
import { Cache } from 'react-native-cache'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'
import { i18n } from '@i18n'
import { theme } from '@theme'
import { Email } from '../Email/Email'
import { registerUser, saveEmailInCache, savePhoneNumberInCache, saveUserInfoInCache } from '@features/Register/Utils/utils'
import { Password } from '../Password/Password'
import { useNavigation } from '@react-navigation/native'
import { SnackBar } from '@components/atoms/SnackBar/SnackBar'
import { SnackBarContainer } from './styles'
import { HOME_STACK } from '@routes/Contants'

export const SignUp: FC = () => {
    const [cache, setCache] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [visible, setVisible] = useState(false)

    const { navigate, reset } = useNavigation()

    const onToggleSnackBar = () => setVisible(true)

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

    const buttonStyle = {
        backgroundColor: theme.colors.primary50,
        borderRadius: 10,
        padding: 8,
        textAlign: 'center',
    }

    const buttonTextStyle = { color: theme.colors.white, fontSize: 18 }

    return (
        <DarkTemplate hasMargin={false}>
            <ProgressSteps
                activeLabelColor={theme.colors.white}
                activeStepIconBorderColor={theme.colors.white}
                borderWidth={3}
                completedLabelColor={theme.colors.primary50}
                completedProgressBarColor={theme.colors.primary50}
                completedStepIconColor={theme.colors.primary50}
                labelColor={theme.colors.white}
                labelFontFamily={theme.fonts.montserratRegular}
                progressBarColor={theme.colors.white}
            >
                <ProgressStep
                    label={i18n.t('steps.personalData')}
                    nextBtnDisabled={disabled}
                    nextBtnStyle={buttonStyle}
                    nextBtnText={i18n.t('buttonLabels.next')}
                    nextBtnTextStyle={buttonTextStyle}
                >
                    <UserInfo cache={cache} setDisabled={setDisabled} />
                </ProgressStep>
                <ProgressStep
                    label={i18n.t('steps.phoneNumber')}
                    nextBtnDisabled={disabled}
                    nextBtnStyle={buttonStyle}
                    nextBtnText={i18n.t('buttonLabels.next')}
                    nextBtnTextStyle={buttonTextStyle}
                    onPrevious={async () => {
                        await saveUserInfoInCache('', '', '', cache)
                    }}
                    previousBtnStyle={buttonStyle}
                    previousBtnText={i18n.t('buttonLabels.back')}
                    previousBtnTextStyle={buttonTextStyle}
                >
                    <PhoneNumber cache={cache} setDisabled={setDisabled} />
                </ProgressStep>
                <ProgressStep
                    finishBtnText={i18n.t('buttonLabels.finish')}
                    label={i18n.t('steps.email')}
                    nextBtnStyle={buttonStyle}
                    nextBtnText={i18n.t('buttonLabels.next')}
                    nextBtnTextStyle={buttonTextStyle}
                    onPrevious={async () => {
                        await savePhoneNumberInCache('', cache)
                    }}
                    previousBtnStyle={buttonStyle}
                    previousBtnText={i18n.t('buttonLabels.back')}
                    previousBtnTextStyle={buttonTextStyle}
                >
                    <Email cache={cache} setDisabled={setDisabled} />
                </ProgressStep>
                <ProgressStep
                    finishBtnText={i18n.t('buttonLabels.finish')}
                    label={i18n.t('steps.password')}
                    nextBtnStyle={buttonStyle}
                    nextBtnTextStyle={buttonTextStyle}
                    onPrevious={async () => {
                        await saveEmailInCache('', cache)
                    }}
                    onSubmit={async () => {
                        const result = await registerUser(cache)
                        if (JSON.stringify(result).includes('"status":400')) {
                            onToggleSnackBar()
                        } else {
                            reset({
                                index: 0,
                                routes: [{ name: HOME_STACK }],
                            })
                            navigate(HOME_STACK, { params: { patientInfo: result }, screen: 'Home' })
                        }
                    }}
                    previousBtnStyle={buttonStyle}
                    previousBtnText={i18n.t('buttonLabels.back')}
                    previousBtnTextStyle={buttonTextStyle}
                >
                    <Password cache={cache} setDisabled={setDisabled} />
                    <SnackBarContainer>
                        {visible && (
                            <SnackBar
                                backgroundColor={theme.colors.danger50}
                                message={i18n.t('error.userAlreadyExist')}
                                setVisible={setVisible}
                            />
                        )}
                    </SnackBarContainer>
                </ProgressStep>
            </ProgressSteps>
        </DarkTemplate>
    )
}
