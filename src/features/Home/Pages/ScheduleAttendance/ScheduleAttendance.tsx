/* eslint-disable max-depth */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React, { FC, useCallback, useState } from 'react'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { DarkTemplate } from '@components/templates/DarkTemplate/DarkTemplate'
import api from 'src/api/api'
import { USER_ATTENDANCE, ALL_ATTENDANCES } from 'src/api/endpoints'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Attendance, Service } from '../Schedule/typings'
import DateTimePicker from '@react-native-community/datetimepicker'
import { ContentContainer, Time, TimeContainer } from './styles'
import { Loading } from '@components/atoms/Loading/Loading'
import { ButtonContainer, LoadingContainer } from '../Schedule/styles'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SumHour } from '@features/Home/Utils/utils'
import { Modal, Portal, Provider } from 'react-native-paper'
import { theme } from '@theme'
import { ButtonContent, ModalSubtitle, ModalTitle } from '../SeeAll/styles'
import { Button } from '@components/atoms/Button/Button'
import { i18n } from '@i18n'

AntDesign.loadFont()

export const ScheduleAttendance: FC = () => {
    const {
        params: { services, token, userName },
    } = useRoute()
    const { goBack } = useNavigation()
    const [loading, setLoading] = useState(false)
    const [attedanceAlreadyScheduled, setAttedanceAlreadyScheduled] = useState([])
    const [filteredAttendances, setFilteredAttendances] = useState([])
    const [searchDate, setSearchDate] = useState(new Date())
    const [selectedServicesTime, setSelectedServicesTime] = useState('')
    const [selectedServiceMinutes, setSelectedServiceMinutes] = useState(0)
    const [timeCards, setTimeCards] = useState([])
    const [cardToRender, setCardToRender] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedTime, setSelectedTime] = useState('')
    const ONE_HOUR = 60
    const LAST_HOUR = 1800 // 18:00

    const mountTimeCards = useCallback(() => {
        if (selectedServiceMinutes > 0) {
            let startTime = '10:00'
            const cards = []

            while (parseInt(startTime.replace(':', ''), 10) + parseInt(selectedServicesTime.replace(':', ''), 10) <= LAST_HOUR) {
                const endTime = SumHour(startTime, selectedServiceMinutes)
                cards.push(`${startTime}/${endTime}`)
                startTime = endTime
            }

            setTimeCards(cards)
        }
    }, [selectedServiceMinutes, selectedServicesTime])

    const getDateAfterAMonth = () => {
        const today = new Date()
        return today.setMonth(today.getMonth() + 1)
    }

    const mountCardToRender = (filteredData: Array<Attendance>) => {
        setCardToRender([])
        const availableCards = []
        const isTheLastAttendance = (index: number) => filteredData.length === index + 1
        let previosEnd = ''
        let availableTime = ''
        filteredData.map(({ horario, idAgendamento }: Attendance, index: number) => {
            if (index === 0) {
                let start = '10:00'

                if (
                    parseInt(horario.replace(':', ''), 10) - parseInt(start.replace(':', ''), 10) >=
                    parseInt(selectedServicesTime.replace(':', ''), 10)
                ) {
                    while (parseInt(start.replace(':', ''), 10) < parseInt(horario.substr(0, 5).replace(':', ''), 10)) {
                        availableTime = SumHour(start, selectedServiceMinutes)
                        availableCards.push({
                            enable: true,
                            key: start,
                            time: `${start}/${availableTime}`,
                        })
                        start = availableTime
                    }
                }
                previosEnd = horario.substr(6, 5)
                availableCards.push({
                    enable: false,
                    key: idAgendamento,
                    time: horario,
                })
            } else {
                availableTime = SumHour(previosEnd, selectedServiceMinutes)
                if (
                    parseInt(horario.replace(':', ''), 10) - parseInt(previosEnd.replace(':', ''), 10) >
                    parseInt(selectedServicesTime.replace(':', ''), 10)
                ) {
                    while (parseInt(availableTime.replace(':', ''), 10) < parseInt(horario.substr(0, 5).replace(':', ''), 10)) {
                        availableCards.push({
                            enable: true,
                            key: previosEnd,
                            time: `${previosEnd}/${availableTime}`,
                        })
                        previosEnd = availableTime
                        availableTime = SumHour(previosEnd, selectedServiceMinutes)
                    }
                }

                previosEnd = horario.substr(6, 5)
                availableCards.push({
                    enable: false,
                    key: idAgendamento,
                    time: horario,
                })
            }
            if (isTheLastAttendance(index)) {
                availableTime = SumHour(previosEnd, selectedServiceMinutes)
                if (LAST_HOUR - parseInt(previosEnd.replace(':', ''), 10) >= parseInt(selectedServicesTime.replace(':', ''), 10)) {
                    while (parseInt(availableTime.replace(':', ''), 10) <= LAST_HOUR) {
                        availableCards.push({
                            enable: true,
                            key: previosEnd,
                            time: `${previosEnd}/${availableTime}`,
                        })
                        previosEnd = availableTime
                        availableTime = SumHour(previosEnd, selectedServiceMinutes)
                    }
                }
            }
            setCardToRender(availableCards)
            return null
        })
    }

    const getAttendancesFromDate = (selectedDate: Date) => {
        const filteredData = attedanceAlreadyScheduled
            .filter(
                ({ dataAgendamento }: Attendance) =>
                    dataAgendamento ===
                    selectedDate
                        .getDate()
                        .toString()
                        .concat('/', (selectedDate.getMonth() + 1).toString(), '/', selectedDate.getFullYear().toString()),
            )
            .sort(
                (a: Attendance, b: Attendance) =>
                    parseInt(a.horario.substr(0, 2).concat(a.horario.substr(3, 2)), 10) -
                    parseInt(b.horario.substr(0, 2).concat(b.horario.substr(3, 2)), 10),
            )
        setFilteredAttendances(filteredData)
        mountCardToRender(filteredData)
        setLoading(false)
    }

    const onChangeDate = (event: object, selectedDate: Date) => {
        setLoading(true)
        setSearchDate(selectedDate)
        getAttendancesFromDate(selectedDate)
    }

    const getSelectedServiceMinutes = useCallback(() => {
        let minutes = 0

        services.map(({ time }: Service) => {
            minutes += parseInt(time.substr(0, 2), 10) * ONE_HOUR
            minutes += parseInt(time.substr(3, 2), 10)
            return 0
        })

        setSelectedServiceMinutes(minutes)
    }, [services])

    const getSelectedServicesTime = useCallback(() => {
        let hours = 0
        let minutes = 0

        services.map(({ time }: Service) => {
            hours += parseInt(time.substr(0, 2), 10)
            minutes += parseInt(time.substr(3, 2), 10)
            if (minutes >= ONE_HOUR) {
                minutes -= ONE_HOUR
                hours++
            }
            return 0
        })

        setSelectedServicesTime(`${hours.toString()}:${minutes > 10 ? minutes.toString() : '0'.concat(minutes.toString())}`)
    }, [services])

    const createAttendance = async () => {
        const servicesName: Array<string> = []

        services.map(({ title }: Service) => servicesName.push(title))

        const day =
            searchDate.getDate().toString().length === 1 ? `0${searchDate.getDate().toString()}` : searchDate.getDate().toString()
        const month = (searchDate.getMonth() + 1).toString()
        const year = searchDate.getFullYear().toString()

        await api
            .post(
                USER_ATTENDANCE,
                {
                    dataAgendamento: `${day}/${month}/${year}`,
                    horario: selectedTime,
                    servico: servicesName,
                    statusAgendamento: 'Aguardando',
                    usuario: userName,
                },
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then(response => {
                setLoading(false)
            })
            .catch(requestError => {
                setLoading(false)
            })

        setShowModal(false)
        goBack()
        goBack()
    }

    useFocusEffect(
        useCallback(() => {
            const getAllAttendances = async () => {
                await api
                    .get(ALL_ATTENDANCES, {
                        headers: {
                            Authorization: token,
                            'Content-Type': 'application/json',
                        },
                    })
                    .then(response => {
                        const { data } = response
                        setAttedanceAlreadyScheduled(data)
                    })
                    .catch(requestError => {
                        setAttedanceAlreadyScheduled(requestError)
                    })
            }
            getAllAttendances()
            getSelectedServicesTime()
            getSelectedServiceMinutes()
            mountTimeCards()
        }, [getSelectedServiceMinutes, getSelectedServicesTime, mountTimeCards, token]),
    )

    return (
        <DarkTemplate>
            <Provider>
                <DateTimePicker
                    display="default"
                    is24Hour={true}
                    maximumDate={getDateAfterAMonth()}
                    minimumDate={new Date()}
                    mode={'date'}
                    onChange={onChangeDate}
                    style={{ marginBottom: 20 }}
                    testID="dateTimePicker"
                    themeVariant={'dark'}
                    value={searchDate}
                />

                {loading ? (
                    <LoadingContainer>
                        <Loading isBlue={false} size={60} />
                    </LoadingContainer>
                ) : (
                    <ContentContainer>
                        <ScrollView>
                            {cardToRender.length > 0 &&
                                cardToRender.map(({ enable, key, time }, index: number) => (
                                    <TouchableOpacity
                                        key={key}
                                        onPress={() => {
                                            if (enable) {
                                                setShowModal(true)
                                                setSelectedTime(time)
                                            }
                                        }}
                                    >
                                        <TimeContainer enable={enable}>
                                            <Time>{time}</Time>
                                        </TimeContainer>
                                    </TouchableOpacity>
                                ))}
                            {filteredAttendances.length === 0 &&
                                timeCards.length > 0 &&
                                timeCards.map((time, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            setSelectedTime(time)
                                            setShowModal(true)
                                        }}
                                    >
                                        <TimeContainer enable={true} key={index}>
                                            <Time>{time}</Time>
                                        </TimeContainer>
                                    </TouchableOpacity>
                                ))}
                        </ScrollView>
                    </ContentContainer>
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
                            visible={true}
                        >
                            <ModalTitle>{i18n.t('title.createAttendance')}</ModalTitle>
                            <ModalSubtitle>{i18n.t('subtitle.youWishToCreateTheAttendance')}</ModalSubtitle>
                            <ButtonContainer>
                                <ButtonContent>
                                    <Button label={i18n.t('labels.yes')} onPress={() => createAttendance()} variant={'tertiary'} />
                                </ButtonContent>
                                <ButtonContent>
                                    <Button label={i18n.t('labels.no')} onPress={() => setShowModal(false)} variant={'tertiary'} />
                                </ButtonContent>
                            </ButtonContainer>
                        </Modal>
                    </Portal>
                )}
            </Provider>
        </DarkTemplate>
    )
}
