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
import { LoadingContainer } from '../Schedule/styles'
import { ScrollView } from 'react-native-gesture-handler'
import { SumHour } from '@features/Home/Utils/utils'

AntDesign.loadFont()

export const ScheduleAttendance: FC = () => {
    const {
        params: { services, token, userName },
    } = useRoute()
    const { navigate } = useNavigation()
    const [loading, setLoading] = useState(false)
    const [attedanceAlreadyScheduled, setAttedanceAlreadyScheduled] = useState([])
    const [filteredAttendances, setFilteredAttendances] = useState([])
    const [searchDate, setSearchDate] = useState(new Date())
    const [selectedServicesTime, setSelectedServicesTime] = useState('')
    const [selectedServiceMinutes, setSelectedServiceMinutes] = useState(0)
    const [timeCards, setTimeCards] = useState([])
    const [cardToRender, setCardToRender] = useState([])
    const ONE_HOUR = 60

    const mountTimeCards = useCallback(() => {
        if (selectedServiceMinutes > 0) {
            let startTime = '10:00'
            const cards = []

            while (parseInt(startTime.replace(':', ''), 10) + parseInt(selectedServicesTime.replace(':', ''), 10) <= 1800) {
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
        filteredData.map(({ horario, idAgendamento }: Attendance, index: number) => {
            if (index === 0) {
                let start = '10:00'

                if (
                    parseInt(horario.replace(':', ''), 10) - parseInt(start.replace(':', ''), 10) >=
                    parseInt(selectedServicesTime.replace(':', ''), 10)
                ) {
                    while (parseInt(start.replace(':', ''), 10) < parseInt(horario.substr(0, 5).replace(':', ''), 10)) {
                        const availableTime = SumHour(start, selectedServiceMinutes)
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
                let availableTime = SumHour(previosEnd, selectedServiceMinutes)
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

                if (isTheLastAttendance(index)) {
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
        await api
            .post(
                USER_ATTENDANCE,
                {
                    dataAgendamento: '22/02/2021',
                    horario: '16:00/16:30',
                    servico: ['Corte Masculino'],
                    statusAgendamento: 'Aguardando',
                    usuario: 'matheus@gmail.com',
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
                                <TimeContainer enable={enable} key={key}>
                                    <Time>{time}</Time>
                                </TimeContainer>
                            ))}
                        {filteredAttendances.length === 0 &&
                            timeCards.length > 0 &&
                            timeCards.map((time, index) => (
                                <TimeContainer enable={true} key={index}>
                                    <Time>{time}</Time>
                                </TimeContainer>
                            ))}
                    </ScrollView>
                </ContentContainer>
            )}
        </DarkTemplate>
    )
}
