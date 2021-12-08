import React, { FC, useState, useCallback, useEffect } from 'react'
import { ScheduleContent, FullColor } from '../styles'
import {
    ServiceName,
    AttendanceContainer,
    AttendanceHeader,
    Day,
    Time,
    Center,
    Title,
    ButtonContainer,
    IconContainer,
    CardContent,
    SeeAllButtonContainer,
    ServicePrice,
    ServiceContainer,
    LoadingContainer,
} from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { i18n } from '@i18n'
import { Button } from '@components/atoms/Button/Button'
import { useNavigation, useRoute } from '@react-navigation/native'
import { isBefore } from 'date-fns'
import { ALL_ATTENDANCES, USER_ATTENDANCE } from 'src/api/endpoints'
import api from 'src/api/api'
import { Loading } from '@components/atoms/Loading/Loading'
import { formatedDateToSchedule, getActualDate } from '@features/Home/Utils/utils'
import { Attendance, Service } from './typings'
import { Modal, Portal, Provider } from 'react-native-paper'
import { theme } from '@theme'
import { ModalSubtitle, ModalTitle, ButtonContent } from '../SeeAll/styles'

AntDesign.loadFont()

export const Schedule: FC = () => {
    const { params } = useRoute()
    const {
        patientInfo: { token, id: userId, userName },
    } = params
    const { navigate } = useNavigation()
    const [loading, setLoading] = useState(true)
    const [attendances, setAttendances] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedAttendace, setSelectedAttendace] = useState(0)

    const cancelAttendance = async () => {
        await api
            .delete(`${USER_ATTENDANCE}${selectedAttendace}`, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                setLoading(false)
            })
            .catch(requestError => {
                setLoading(false)
            })
        setShowModal(false)
    }

    useEffect(
        useCallback(() => {
            const getAttendance = async () => {
                if (userId !== 2) {
                    await api
                        .get(`${USER_ATTENDANCE}${userId}`, {
                            headers: {
                                Authorization: token,
                                'Content-Type': 'application/json',
                            },
                        })
                        .then(response => {
                            const { data } = response
                            setLoading(false)
                            setAttendances(data)
                        })
                        .catch(requestError => {
                            setLoading(false)
                            setAttendances(requestError)
                        })
                } else {
                    await api
                        .get(ALL_ATTENDANCES, {
                            headers: {
                                Authorization: token,
                                'Content-Type': 'application/json',
                            },
                        })
                        .then(response => {
                            const { data } = response
                            setLoading(false)
                            setAttendances(data)
                        })
                        .catch(requestError => {
                            setLoading(false)
                            setAttendances(requestError)
                        })
                }
            }
            getAttendance()
        }, [userId, token]),
    )

    return (
        <FullColor>
            <Provider>
                <ScheduleContent>
                    {loading ? (
                        <LoadingContainer>
                            <Loading isBlue={false} size={80} />
                        </LoadingContainer>
                    ) : attendances.length > 0 ? (
                        <>
                            <SeeAllButtonContainer>
                                <ButtonContainer>
                                    <Button
                                        label={i18n.t('buttonLabels.seeAllSchedule')}
                                        onPress={() => {
                                            navigate('SeeAll', { id: userId, token: token })
                                        }}
                                    />
                                </ButtonContainer>
                            </SeeAllButtonContainer>

                            {attendances
                                .sort(
                                    (a: string, b: string) =>
                                        new Date(formatedDateToSchedule(b.dataAgendamento)) -
                                        new Date(formatedDateToSchedule(a.dataAgendamento)),
                                )
                                .splice(0, 3)
                                .map(({ dataAgendamento, horario, servico, idAgendamento }: Attendance, index: number) => {
                                    const formatedDate = formatedDateToSchedule(dataAgendamento)
                                    const day = new Date(formatedDate).getDate().toString()
                                    const month = new Date(formatedDate).getMonth().toString()
                                    const year = new Date(formatedDate).getFullYear().toString()
                                    const endTime = horario.substr(6, 5)
                                    const endHour = parseInt(endTime.substr(0, 2), 10)
                                    const endMinute = parseInt(endTime.substr(3, 2), 10)
                                    const statusAgendamento = isBefore(
                                        new Date(
                                            Date.UTC(parseInt(year, 10), parseInt(month, 10), parseInt(day, 10), endHour, endMinute),
                                        ),
                                        getActualDate(),
                                    )

                                    return (
                                        <AttendanceContainer key={index} status={statusAgendamento}>
                                            <IconContainer>
                                                {statusAgendamento ? (
                                                    <AntDesign color="black" name="check" size={50} />
                                                ) : (
                                                    <AntDesign color="black" name="calendar" size={50} />
                                                )}
                                            </IconContainer>
                                            <CardContent>
                                                <AttendanceHeader>
                                                    <Day>{dataAgendamento}</Day>
                                                    <Time>{horario}</Time>
                                                    <AntDesign
                                                        color="red"
                                                        name="delete"
                                                        onPress={() => {
                                                            setSelectedAttendace(idAgendamento)
                                                            setShowModal(true)
                                                        }}
                                                        size={20}
                                                    />
                                                </AttendanceHeader>
                                                {servico.map(({ nomeServico, precoServico, id }: Service) => (
                                                    <ServiceContainer key={id}>
                                                        <ServicePrice>{`R$ ${precoServico}.00`}</ServicePrice>
                                                        <ServiceName>{nomeServico}</ServiceName>
                                                    </ServiceContainer>
                                                ))}
                                            </CardContent>
                                        </AttendanceContainer>
                                    )
                                })}
                            {userId !== 2 && (
                                <ButtonContainer>
                                    <Button
                                        label={i18n.t('buttonLabels.addSchedule')}
                                        onPress={() => navigate('SelectService', { token: token, userName: userName })}
                                    >
                                        <AntDesign color="white" name="plus" size={25} />
                                    </Button>
                                </ButtonContainer>
                            )}
                        </>
                    ) : (
                        <>
                            <Title>{i18n.t('subtitle.createSchedule')}</Title>
                            <Center>
                                <AntDesign color="gray" name="calendar" size={250} />
                            </Center>
                            <ButtonContainer>
                                <Button
                                    label={i18n.t('buttonLabels.addSchedule')}
                                    labelSize="large"
                                    onPress={() => navigate('SelectService', { token: token, userName: userName })}
                                    useButtonContainer={true}
                                />
                            </ButtonContainer>
                        </>
                    )}
                </ScheduleContent>
                {showModal && (
                    <Portal>
                        <Modal
                            contentContainerStyle={{
                                backgroundColor: theme.colors.black100,
                                marginTop: 40,
                                padding: 20,
                            }}
                            onDismiss={() => setShowModal(false)}
                            visible={showModal}
                        >
                            <ModalTitle>{i18n.t('title.cancelAttendance')}</ModalTitle>
                            <ModalSubtitle>{i18n.t('subtitle.youWishToCancelTheAttendance')}</ModalSubtitle>
                            <ButtonContainer>
                                <ButtonContent>
                                    <Button
                                        label={i18n.t('labels.yes')}
                                        onPress={async () => await cancelAttendance()}
                                        variant={'tertiary'}
                                    />
                                </ButtonContent>
                                <ButtonContent>
                                    <Button label={i18n.t('labels.no')} onPress={() => setShowModal(false)} variant={'tertiary'} />
                                </ButtonContent>
                            </ButtonContainer>
                        </Modal>
                    </Portal>
                )}
            </Provider>
        </FullColor>
    )
}
