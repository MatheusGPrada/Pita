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
    const ONE_HOUR = 60

    const mountTimeCards = useCallback(() => {
        if (selectedServiceMinutes > 0) {
            let startTime = '10:00'
            const cards = []

            while (
                parseInt(startTime.substr(0, 2).concat(startTime.substr(3, 2)), 10) +
                    parseInt(selectedServicesTime.substr(0, 2).concat(selectedServicesTime.substr(2, 2)).replace(':', ''), 10) <=
                1800
            ) {
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

    const getAttendancesFromDate = (selectedDate: Date) => {
        setFilteredAttendances(
            attedanceAlreadyScheduled
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
                ),
        )

        const teste = attedanceAlreadyScheduled
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
        teste.map(({ horario }) => console.debug('horario', horario))
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
                        {!loading &&
                            filteredAttendances.length > 0 &&
                            filteredAttendances.map(({ horario, idAgendamento }: Attendance) => {
                                const startAt = horario.substr(0, 5)
                                const endAt = horario.substr(6, 5)

                                return (
                                    <TimeContainer key={idAgendamento}>
                                        <Time>{horario}</Time>
                                    </TimeContainer>
                                )
                            })}
                        {!loading &&
                            filteredAttendances.length === 0 &&
                            timeCards.length > 0 &&
                            timeCards.map((time, index) => (
                                <TimeContainer key={index}>
                                    <Time>{time}</Time>
                                </TimeContainer>
                            ))}
                    </ScrollView>
                </ContentContainer>
            )}
        </DarkTemplate>
    )
}
