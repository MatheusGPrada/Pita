import React, { FC, useState } from 'react'
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
import { i18n } from '@i18n'
import { Button } from '@components/atoms/Button/Button'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Modal, Portal, Provider } from 'react-native-paper'
import { theme } from '@theme'
import { isBefore } from 'date-fns'

AntDesign.loadFont()

export const Schedule: FC = () => {
    const { params } = useRoute()
    const {
        patientInfo: { token },
    } = params
    const { navigate } = useNavigation()
    const [showSeeAll, setShowSeeAll] = useState(false)

    // const attendances = []
    const attendances = [
        {
            dataAgendamento: '10/12/2021',
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
            dataAgendamento: '02/01/2021',
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
            dataAgendamento: '03/01/2021',
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

    return (
        <FullColor>
            <Provider>
                <ScheduleContent>
                    {attendances.length > 0 ? (
                        <>
                            <SeeAllContainer>
                                <ButtonContainer>
                                    <Button label={i18n.t('buttonLabels.seeAllSchedule')} onPress={() => setShowSeeAll(true)} />
                                </ButtonContainer>
                            </SeeAllContainer>

                            {attendances.map(({ dataAgendamento, horario, servico }) => {
                                const month = new Date(dataAgendamento).getDate().toString()
                                const day = (new Date(dataAgendamento).getMonth() + 1).toString()
                                const year = new Date(dataAgendamento).getFullYear().toString()
                                const statusAgendamento = isBefore(new Date(month.concat('/', day, '/', year)), new Date())

                                return (
                                    <AttendanceContainer key={dataAgendamento} status={statusAgendamento}>
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
                                            </AttendanceHeader>
                                            {servico.map(({ nomeServico, precoServico, id }) => (
                                                <ServiceContainer key={id}>
                                                    <ServicePrice>{`R$ ${precoServico}.00`}</ServicePrice>
                                                    <Service>{nomeServico}</Service>
                                                </ServiceContainer>
                                            ))}
                                        </CardContent>
                                    </AttendanceContainer>
                                )
                            })}
                            <ButtonContainer>
                                <Button
                                    label={i18n.t('buttonLabels.addSchedule')}
                                    onPress={() => navigate('SelectService', { token: token })}
                                >
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
                                    onPress={() => navigate('SelectService')}
                                    useButtonContainer={true}
                                />
                            </ButtonContainer>
                        </>
                    )}
                    {showSeeAll && (
                        <Portal>
                            <Modal
                                contentContainerStyle={{
                                    backgroundColor: theme.colors.black100,
                                    marginTop: 40,
                                    padding: 20,
                                }}
                                onDismiss={() => setShowSeeAll(false)}
                                visible={showSeeAll}
                            />
                        </Portal>
                    )}
                </ScheduleContent>
            </Provider>
        </FullColor>
    )
}
