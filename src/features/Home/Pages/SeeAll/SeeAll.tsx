import React, { FC, useCallback, useState, useEffect } from 'react'
import { ScheduleContent, FullColor } from '../styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useRoute } from '@react-navigation/native'
import { isBefore } from 'date-fns'
import { formatedDateToSchedule } from '@features/Home/Utils/utils'
import { Attendance, Service } from '../Schedule/typings'
import { ScrollView } from 'react-native-gesture-handler'
import {
    LoadingContainer,
    ServiceName,
    AttendanceContainer,
    AttendanceHeader,
    Day,
    Time,
    IconContainer,
    CardContent,
    ServicePrice,
    ServiceContainer,
} from '../Schedule/styles'
import { Loading } from '@components/atoms/Loading/Loading'
import api from 'src/api/api'
import { ALL_ATTENDANCES, USER_ATTENDANCE } from 'src/api/endpoints'
import { Modal, Portal, Provider } from 'react-native-paper'
import { theme } from '@theme'
import { ButtonContainer, ModalSubtitle, ModalTitle, ButtonContent } from './styles'
import { i18n } from '@i18n'
import { Button } from '@components/atoms/Button/Button'

AntDesign.loadFont()

export const SeeAll: FC = () => {
    const { params } = useRoute()
    const { token, id: userId } = params
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
        }, [token, userId]),
    )

    return (
        <FullColor>
            <Provider>
                <ScheduleContent>
                    {loading && (
                        <LoadingContainer>
                            <Loading isBlue={false} size={80} />
                        </LoadingContainer>
                    )}
                    {!loading && !showModal && (
                        <ScrollView>
                            {attendances
                                .sort(
                                    (a: string, b: string) =>
                                        new Date(formatedDateToSchedule(b.dataAgendamento)) -
                                        new Date(formatedDateToSchedule(a.dataAgendamento)),
                                )
                                .map(({ dataAgendamento, horario, servico, idAgendamento }: Attendance, index: number) => {
                                    const formatedDate = formatedDateToSchedule(dataAgendamento)
                                    const day = new Date(formatedDate).getDate().toString()
                                    const month = (new Date(formatedDate).getMonth() + 1).toString()
                                    const year = new Date(formatedDate).getFullYear().toString()
                                    const statusAgendamento = isBefore(new Date(month.concat('/', day, '/', year)), new Date())

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
                        </ScrollView>
                    )}
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
                </ScheduleContent>
            </Provider>
        </FullColor>
    )
}
