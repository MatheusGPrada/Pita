import React, { FC } from 'react'
import { ScheduleContent, FullColor } from '../styles'
import {
    Service,
    AttendanceContainer,
    AttendanceHeader,
    Day,
    Time,
    Center,
    Title,
    ButtonContainer,
    IconContainer,
    CardContent,
    SeeAllContainer,
    ServicePrice,
    ServiceContainer,
} from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { i18n } from '@i18n'
import { Button } from '@components/atoms/Button/Button'
import { useRoute } from '@react-navigation/native'

AntDesign.loadFont()
SimpleLineIcons.loadFont()

export const Schedule: FC = () => {
    const { params } = useRoute()

    // console.debug('paramss1', params)

    // const attendances = []
    const attendances = [
        {
            dataAgendamento: '01/01',
            horario: '12:00/13:00',
            idAgendamento: 0,
            servico: [
                {
                    id: 1,
                    nomeServico: 'Corte Masculino',
                    precoServico: 50,
                    tempoServico: '1:00',
                },
            ],
            statusAgendamento: 'ativo',
        },
        {
            dataAgendamento: '02/01',
            horario: '12:00/13:00',
            idAgendamento: 0,
            servico: [
                {
                    id: 1,
                    nomeServico: 'Corte Masculino',
                    precoServico: 50,
                    tempoServico: '1:00',
                },
            ],
            statusAgendamento: 'antigo',
        },
        {
            dataAgendamento: '03/01',
            horario: '12:00/13:00',
            idAgendamento: 0,
            servico: [
                {
                    id: 1,
                    nomeServico: 'Corte Masculino',
                    precoServico: 50,
                    tempoServico: '1:00',
                },
                {
                    id: 2,
                    nomeServico: 'Corte Feminino',
                    precoServico: 50,
                    tempoServico: '1:00',
                },
            ],
            statusAgendamento: 'antigo',
        },
    ]

    const addSchedule = () => {
        // TO DO - ADD SCHEDULE FLOW
    }

    return (
        <FullColor>
            <ScheduleContent>
                {attendances.length > 0 ? (
                    <>
                        <SeeAllContainer>
                            <ButtonContainer>
                                <Button label={i18n.t('buttonLabels.seeAllSchedule')} onPress={() => addSchedule()} />
                            </ButtonContainer>
                        </SeeAllContainer>

                        {attendances.map(attendance => (
                            <AttendanceContainer key={attendance.dataAgendamento} status={attendance.statusAgendamento}>
                                <IconContainer>
                                    <SimpleLineIcons color="black" name="mustache" size={50} />
                                </IconContainer>
                                <CardContent>
                                    <AttendanceHeader>
                                        <Day>{attendance.dataAgendamento}</Day>
                                        <Time>{attendance.horario}</Time>
                                    </AttendanceHeader>
                                    {attendance.servico.map(({ nomeServico, precoServico, id }) => (
                                        <ServiceContainer key={id}>
                                            <ServicePrice>{`R$ ${precoServico}.00`}</ServicePrice>
                                            <Service>{nomeServico}</Service>
                                        </ServiceContainer>
                                    ))}
                                </CardContent>
                            </AttendanceContainer>
                        ))}
                        <ButtonContainer>
                            <Button label={i18n.t('buttonLabels.addSchedule')} onPress={() => addSchedule()}>
                                <AntDesign color="white" name="plus" size={25} />
                            </Button>
                        </ButtonContainer>
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
                                onPress={() => addSchedule()}
                                useButtonContainer={true}
                            />
                        </ButtonContainer>
                    </>
                )}
            </ScheduleContent>
        </FullColor>
    )
}
