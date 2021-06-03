import React, { useState, useCallback, FC } from 'react'
import { ProfileHeader, ProfileContent, UserName, FullSizeBgColor, Footer, ButtonContainer, ContentTitle } from '../styles'
import Icon from 'react-native-vector-icons/Feather'
import { Button } from '../../../../components/atoms/Button'
import { i18n } from '../../../../_translate/i18n'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Attendance, AttendanceContainer, AttendanceHeader, Day, Time } from './styles'

Icon.loadFont()

export const Schedule: FC = () => {
    const [attendance, setAttendance] = useState([''])
    const [loading, setLoading] = useState(true)

    const checkSchedule = () => {
        // TO DO - CHECK THE SCHEDULE
        return [{ day: '01/01', scheduledAttendance: ['Corte masculino', 'Tintura masculino'], time: '12:00/13:00' }]
    }

    const { navigate } = useNavigation()

    useFocusEffect(
        useCallback(async () => {
            await setAttendance(checkSchedule())
            await setLoading(false)
        }, []),
    )

    return (
        <FullSizeBgColor>
            {!loading && (
                <ProfileHeader>
                    <AttendanceContainer>
                        <AttendanceHeader>
                            <Day>{attendance[0].day}</Day>
                            <Time>{attendance[0].time}</Time>
                        </AttendanceHeader>
                        {attendance[0].scheduledAttendance.map(service => (
                            <Attendance key={service}>{service}</Attendance>
                        ))}
                    </AttendanceContainer>
                </ProfileHeader>
            )}
            <ProfileContent></ProfileContent>
            <Footer></Footer>
        </FullSizeBgColor>
    )
}
