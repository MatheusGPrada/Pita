import React, { useState } from 'react'
import {
    ProfileHeader,
    ProfileContent,
    UserName,
    FullColor,
    ButtonContainer,
    ContentTitle,
    UserAvatar,
    UserLetter,
    PasswordTitle,
} from '../styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation, useRoute } from '@react-navigation/native'
import { LOGIN_STACK } from '@routes/Contants'
import { Button } from '@components/atoms/Button/Button'
import { i18n } from '@i18n'
import { Provider, TextInput } from 'react-native-paper'
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

    const [showChangePhone, setShowChangePhone] = useState(false)
    const [changePhone, setChangePhone] = useState('')

    const [showChangePassword, setShowChangePassword] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [changePassword, setChangePassword] = useState('')

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
                {showChangePhone && (
                    <EditingInfoModal
                        Title={i18n.t('title.changePhone')}
                        errorMessage={i18n.t('error.invalidPhoneNumber')}
                        onSubmiting={() => console.debug('Adicionar chamada do enpoint')}
                        setValue={setChangePhone}
                        setVisible={setShowChangePhone}
                        validFunction={(value: string) => value.length === 15}
                        value={changePhone}
                    />
                )}
                {showChangePassword && (
                    <EditingInfoModal
                        Title={i18n.t('title.oldPassword')}
                        errorMessage={i18n.t('error.invalidPassword')}
                        onSubmiting={() => console.debug('Adicionar chamada do enpoint')}
                        setValue={setChangePassword}
                        setVisible={setShowChangePassword}
                        validFunction={(value: string) => value.length > 0}
                        value={changePassword}
                    >
                        <TextInput
                            onBlur={(value: string) => {
                                setOldPassword(value)
                                // valid if the password is correct
                            }}
                            onChangeText={setOldPassword}
                            onSubmitEditing={() => {
                                // valid if the password is correct
                            }}
                            style={{ backgroundColor: 'white', height: 55, marginBottom: 20 }}
                            theme={{ colors: { primary: 'black' } }}
                            value={oldPassword}
                        />
                        <PasswordTitle>{i18n.t('title.changePassword')}</PasswordTitle>
                    </EditingInfoModal>
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
                        <Button
                            label={cellphone}
                            onPress={() => setShowChangePhone(true)}
                            useButtonContainer={true}
                            variant={'tertiary'}
                        >
                            <MaterialCommunityIcons color="black" name="cellphone-basic" size={36} />
                        </Button>
                    </ButtonContainer>
                    <ButtonContainer>
                        <Button
                            label={i18n.t('buttonLabels.changePassword')}
                            onPress={() => setShowChangePassword(true)}
                            useButtonContainer={true}
                            variant={'tertiary'}
                        >
                            <MaterialCommunityIcons color="black" name="lock" size={36} />
                        </Button>
                    </ButtonContainer>
                </ProfileContent>

                <Button label={i18n.t('buttonLabels.logout')} labelSize="large" onPress={() => doLogOut()} useButtonContainer={true} />
            </Provider>
        </FullColor>
    )
}
