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
import api from 'src/api/api'
import { UPDATE_USER } from 'src/api/endpoints'

MaterialCommunityIcons.loadFont()
AntDesign.loadFont()

export const Account = () => {
    const { navigate, reset } = useNavigation()
    const {
        params: {
            patientInfo: { nome, telefone },
        },
    } = useRoute()

    const [showChangeName, setShowChangeName] = useState(false)
    const [changeName, setChangeName] = useState('')

    const [showChangePhone, setShowChangePhone] = useState(false)
    const [changePhone, setChangePhone] = useState('')

    const callUpdateUser = async userInfo => {
        await api
            .get(UPDATE_USER, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                const { data } = response
                setLoading(false)
                setServices(data)
            })
            .catch(requestError => {
                setLoading(false)
                setServices(requestError)
            })
    }

    const postChangePassword = (password: string) => {
        return {}
    }

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

                <ProfileContent>
                    <ContentTitle>{i18n.t('title.changeProfileData')}</ContentTitle>
                    <ButtonContainer>
                        <Button label={nome} onPress={() => setShowChangeName(true)} useButtonContainer={true} variant={'tertiary'}>
                            <MaterialCommunityIcons color="black" name="account" size={36} />
                        </Button>
                    </ButtonContainer>
                    <ButtonContainer>
                        <Button
                            label={telefone}
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
