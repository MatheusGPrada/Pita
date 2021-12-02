import React, { FC, useState } from 'react'
import { Modal, Portal, TextInput } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { theme } from '@theme'
import { ChangeName, ModalContent, ModalHeader, SnackBarContainer } from './styles'
import { SnackBar } from '@components/atoms/SnackBar/SnackBar'
import AntDesign from 'react-native-vector-icons/AntDesign'

AntDesign.loadFont()

export const EditingInfoModal: FC = ({
    Title = '',
    setValue = (any: string) => null,
    value = '',
    onSubmiting = (any: string) => null,
    setVisible = (any: boolean) => null,
    validFunction = (any: string) => null,
    errorMessage = '',
    children = <></>,
}) => {
    const [showSnackBar, setShowSnackBar] = useState(false)

    return (
        <Portal>
            <Modal
                contentContainerStyle={{
                    backgroundColor: theme.colors.black100,
                    marginTop: 40,
                    padding: 20,
                }}
                onDismiss={() => setVisible(false)}
                visible={true}
            >
                <ModalHeader>
                    <TouchableOpacity onPress={() => setVisible(false)}>
                        <AntDesign color="white" name="close" size={36} />
                    </TouchableOpacity>
                </ModalHeader>
                <ModalContent>
                    <ChangeName>{Title}</ChangeName>
                    {children}
                    <TextInput
                        onBlur={setValue}
                        onChangeText={setValue}
                        onSubmitEditing={() => {
                            if (validFunction(value)) {
                                setValue(value)
                                onSubmiting(value)
                            } else {
                                setShowSnackBar(true)
                            }
                        }}
                        right={
                            <TextInput.Icon
                                name={() => <AntDesign color={theme.colors.primary50} name="arrowright" size={36} />}
                                onPress={() => {
                                    if (validFunction(value)) {
                                        onSubmiting(value)
                                    } else {
                                        setShowSnackBar(true)
                                    }
                                }}
                            />
                        }
                        style={{ backgroundColor: 'white', height: 55, marginBottom: 20 }}
                        theme={{ colors: { primary: 'black' } }}
                        value={value}
                    />
                    <SnackBarContainer>
                        {showSnackBar && (
                            <SnackBar backgroundColor={theme.colors.danger50} message={errorMessage} setVisible={setShowSnackBar} />
                        )}
                    </SnackBarContainer>
                </ModalContent>
            </Modal>
        </Portal>
    )
}
