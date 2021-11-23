import React, { useState } from 'react'
import { ProfileHeader, ProfileContent, UserName, FullColor, ButtonContainer, ContentTitle, UserAvatar, UserLetter } from '../styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation, useRoute } from '@react-navigation/native'
import { LOGIN_STACK } from '@routes/Contants'
import { Button } from '@components/atoms/Button/Button'
import { i18n } from '@i18n'
import { Provider } from 'react-native-paper'
import { EditingInfoModal } from '@components/molecules/EditingInfoModal/EditingInfoModal'
import { isFilled } from '@utils/validations'
import { validEmailRegex } from '@features/Register/Utils/utils'

MaterialCommunityIcons.loadFont()
AntDesign.loadFont()

export const Account = () => {
    const { navigate, reset } = useNavigation()
    const { params } = useRoute()

    const [showChangeName, setShowChangeName] = useState(false)
    const [changeName, setChangeName] = useState('')

    const [showChangeEmail, setShowChangeEmail] = useState(false)
    const [changeEmail, setChangeEmail] = useState('')

    const {
        patientInfo: { nome, userName, senha },
    } = params

    const cellphone = '(11) 98688-8177'

    const doLogOut = () => {
        navigate(LOGIN_STACK, { screen: 'LoginOptions' })
        reset({
            index: 0,
            routes: [{ name: LOGIN_STACK }],
        })
    }

    return (
        <FullColor>
            <Provider>
                <ProfileHeader>
                    <UserAvatar>
                        <UserLetter>{nome.substr(0, 1).toUpperCase()}</UserLetter>
                    </UserAvatar>
                    <UserName>{nome}</UserName>
                </ProfileHeader>
                {showChangeName && (
                    <EditingInfoModal
                        Title={i18n.t('title.changeName')}
                        errorMessage={i18n.t('error.emptyName')}
                        onSubmiting={() => console.debug('Adicionar chamada do enpoint')}
                        setValue={setChangeName}
                        setVisible={setShowChangeName}
                        validFunction={isFilled}
                        value={changeName}
                    />
                )}
                {showChangeEmail && (
                    <EditingInfoModal
                        Title={i18n.t('title.changeEmail')}
                        errorMessage={i18n.t('error.invalidEmail')}
                        onSubmiting={() => console.debug('Adicionar chamada do enpoint')}
                        setValue={setChangeEmail}
                        setVisible={setShowChangeEmail}
                        validFunction={(value: string) => validEmailRegex.test(value)}
                        value={changeEmail}
                    />
                )}

                <ProfileContent>
                    <ContentTitle>{i18n.t('title.changeProfileData')}</ContentTitle>
                    <ButtonContainer>
                        <Button label={nome} onPress={() => setShowChangeName(true)} useButtonContainer={true} variant={'tertiary'}>
                            <MaterialCommunityIcons color="black" name="account" size={36} />
                        </Button>
                    </ButtonContainer>
                    <ButtonContainer>
                        <Button
                            label={userName}
                            onPress={() => setShowChangeEmail(true)}
                            useButtonContainer={true}
                            variant={'tertiary'}
                        >
                            <MaterialCommunityIcons color="black" name="email" size={36} />
                        </Button>
                    </ButtonContainer>
                    <ButtonContainer>
                        <Button label={cellphone} useButtonContainer={true} variant={'tertiary'}>
                            <MaterialCommunityIcons color="black" name="cellphone-basic" size={36} />
                        </Button>
                    </ButtonContainer>
                    <ButtonContainer>
                        <Button label={i18n.t('buttonLabels.changePassword')} useButtonContainer={true} variant={'tertiary'}>
                            <MaterialCommunityIcons color="black" name="lock" size={36} />
                        </Button>
                    </ButtonContainer>
                </ProfileContent>

                <Button label={i18n.t('buttonLabels.logout')} labelSize="large" onPress={() => doLogOut()} useButtonContainer={true} />
            </Provider>
        </FullColor>
    )
}
