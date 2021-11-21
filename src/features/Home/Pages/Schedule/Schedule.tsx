import React, { FC } from 'react'
import { ScheduleContent, Footer, ContentContainer } from '../styles'
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
import { Attendances } from './typings'
import Icon from 'react-native-vector-icons/AntDesign'
import { i18n } from '@i18n'
import { Button } from '@components/atoms/Button/Button'
import { ImageBackground } from 'react-native'

Icon.loadFont()

export const Schedule: FC = () => {
    //const attendances = []
    const attendances = [
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

    const addSchedule = () => {
        // TO DO - ADD SCHEDULE FLOW
    }

    return (
        <ImageBackground resizeMode="cover" source={require('../../../../assets/images/brick_wall.jpg')} style={{ flex: 1 }}>
            {attendances ? (
                <ScheduleContent>
                    <ContentContainer>
                        <ContentHeader>
                            <Title>{i18n.t('title.scheduleds')}</Title>
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
                            <Button label={i18n.t('buttonLabels.addSchedule')} onPress={() => addSchedule()}>
                                <Icon color="white" name="plus" size={25} />
                            </Button>
                        </ButtonContainer>
                    </ContentContainer>
                </ScheduleContent>
            ) : (
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
        </ImageBackground>
    )
}
