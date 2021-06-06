import React, { useState, useCallback, FC } from 'react'
import { ScheduleContent, FullSizeBgColor, Footer, ContentContainer } from '../styles'
import { useFocusEffect } from '@react-navigation/native'
import {
    Attendance,
    AttendanceContainer,
    AttendanceHeader,
    Day,
    Title,
    Time,
    Center,
    SubTitle,
    ContentHeader,
    ButtonContainer,
} from './styles'
import { i18n } from '../../../../_translate/i18n'
import { Attendances } from './typings'
import Icon from 'react-native-vector-icons/AntDesign'
import { Button } from '../../../../components/atoms/Button/Button'

Icon.loadFont()

export const Schedule: FC = () => {
    const [attendances, setAttendances] = useState<Attendances>([''])
    const [loading, setLoading] = useState(true)

    const checkSchedule = () => {
        // TO DO - CHECK THE SCHEDULE
        let Scheduleds = [
            {
                day: '01/01',
                scheduledAttendance: ['Corte masculino', 'Tintura masculino', 'Hidratação'],
                time: '12:00/13:00',
            },
            {
                day: '02/01',
                scheduledAttendance: ['Corte masculino', 'Tintura masculino', 'Hidratação'],
                time: '12:00/13:00',
            },
            {
                day: '03/01',
                scheduledAttendance: ['Corte masculino', 'Tintura masculino', 'Hidratação'],
                time: '12:00/13:00',
            },
        ]
        return Scheduleds?.slice(0, 2)
    }

    const addSchedule = () => {
        // TO DO - ADD SCHEDULE FLOW
    }

    const seeAllSchedule = () => {
        // TO DO - SEE ALL SCHEDULE
    }

    useFocusEffect(
        useCallback(() => {
            setAttendances(checkSchedule())
            setLoading(false)
        }, []),
    )

    return (
        <FullSizeBgColor>
            {/* TO DO - ADD THE FULLSIZE LOADING {loading && } */}
            {!loading && attendances && (
                <ScheduleContent>
                    <ContentContainer>
                        <ContentHeader>
                            <Title>{i18n.t('title.scheduleds')}</Title>
                            <Button
                                label={i18n.t('buttonLabels.seeAllSchedule')}
                                onPress={() => seeAllSchedule()}
                                variant="secondary"
                            />
                        </ContentHeader>

                        {attendances.map((attendance: Attendances) => (
                            <AttendanceContainer key={attendance.day}>
                                <AttendanceHeader>
                                    <Day>{attendance.day}</Day>
                                    <Time>{attendance.time}</Time>
                                </AttendanceHeader>
                                {attendance.scheduledAttendance.map(service => (
                                    <Attendance key={service}>{service}</Attendance>
                                ))}
                            </AttendanceContainer>
                        ))}
                        <ButtonContainer>
                            <Button label={i18n.t('buttonLabels.seeAllSchedule')} onPress={() => addSchedule()}>
                                <Icon color="white" name="plus" size={25} />
                            </Button>
                        </ButtonContainer>
                    </ContentContainer>
                </ScheduleContent>
            )}
            {!loading && !attendances && (
                <ScheduleContent>
                    <Title>{i18n.t('title.schedule')}</Title>
                    <SubTitle>{i18n.t('subtitle.createSchedule')}</SubTitle>
                    <Center>
                        <Icon color="gray" name="calendar" size={250} />
                    </Center>
                    <Footer>
                        <Button
                            label={i18n.t('buttonLabels.doSchedule')}
                            labelSize="large"
                            onPress={() => addSchedule()}
                            useButtonContainer={true}
                        />
                    </Footer>
                </ScheduleContent>
            )}
        </FullSizeBgColor>
    )
}
