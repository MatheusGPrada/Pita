import React, { useState, useCallback } from 'react'
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
import api from 'src/api/api'
import { UPDATE_USER } from 'src/api/endpoints'

MaterialCommunityIcons.loadFont()
AntDesign.loadFont()

export const Account = () => {
    const { navigate, reset } = useNavigation()
    const {
        params: {
            patientInfo: { nome, telefone, token, id },
        },
    } = useRoute()

    const [showChangeName, setShowChangeName] = useState(false)
    const [changeName, setChangeName] = useState(nome)

    const [showChangePhone, setShowChangePhone] = useState(false)
    const [changePhone, setChangePhone] = useState(telefone)

    const callUpdateUser = useCallback(
        async (changeValue: string) => {
            const valueToChange = changeValue === 'name' ? { id: id, nome: changeName } : { id: id, telefone: changePhone }

            await api
                .put(UPDATE_USER, valueToChange, {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => {})
                .catch(requestError => {})
        },
        [changeName, changePhone, id, token],
    )

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
                        <UserLetter>{changeName.substr(0, 1).toUpperCase()}</UserLetter>
                    </UserAvatar>
                    <UserName>{changeName}</UserName>
                </ProfileHeader>
                {showChangeName && (
                    <EditingInfoModal
                        Title={i18n.t('title.changeName')}
                        errorMessage={i18n.t('error.emptyName')}
                        onSubmiting={() => {
                            callUpdateUser('name')
                            setShowChangeName(false)
                        }}
                        setValue={setChangeName}
                        setVisible={setShowChangeName}
                        validFunction={isFilled}
                        value={changeName}
                    />
                )}
                {showChangePhone && (
                    <EditingInfoModal
                        Title={i18n.t('title.changePhone')}
                        errorMessage={i18n.t('error.invalidPhoneNumber')}
                        onSubmiting={() => {
                            setShowChangePhone(false)
                            callUpdateUser('phone')
                        }}
                        setValue={setChangePhone}
                        setVisible={setShowChangePhone}
                        showPhoneMask={true}
                        validFunction={(value: string) => value.length === 15}
                        value={changePhone}
                    />
                )}

                <ProfileContent>
                    <ContentTitle>{i18n.t('title.changeProfileData')}</ContentTitle>
                    <ButtonContainer>
                        <Button
                            label={changeName}
                            onPress={() => setShowChangeName(true)}
                            useButtonContainer={true}
                            variant={'tertiary'}
                        >
                            <MaterialCommunityIcons color="black" name="account" size={36} />
                        </Button>
                    </ButtonContainer>
                    <ButtonContainer>
                        <Button
                            label={changePhone}
                            onPress={() => setShowChangePhone(true)}
                            useButtonContainer={true}
                            variant={'tertiary'}
                        >
                            <MaterialCommunityIcons color="black" name="cellphone-basic" size={36} />
                        </Button>
                    </ButtonContainer>
                </ProfileContent>

                <Button label={i18n.t('buttonLabels.logout')} labelSize="large" onPress={() => doLogOut()} useButtonContainer={true} />
            </Provider>
        </FullColor>
    )
}
