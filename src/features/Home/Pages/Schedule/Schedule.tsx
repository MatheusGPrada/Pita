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
import { useRoute } from '@react-navigation/native'
import { Modal, Portal, Provider } from 'react-native-paper'
import { theme } from '@theme'

AntDesign.loadFont()

export const Schedule: FC = () => {
    const [showSeeAll, setShowSeeAll] = useState(false)
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
            <Provider>
                <ScheduleContent>
                    {attendances.length > 0 ? (
                        <>
                            <SeeAllContainer>
                                <ButtonContainer>
                                    <Button label={i18n.t('buttonLabels.seeAllSchedule')} onPress={() => setShowSeeAll(true)} />
                                </ButtonContainer>
                            </SeeAllContainer>

                            {attendances.map(({ dataAgendamento, horario, servico, statusAgendamento }) => (
                                <AttendanceContainer key={dataAgendamento} status={statusAgendamento}>
                                    <IconContainer>
                                        {statusAgendamento === 'ativo' ? (
                                            <AntDesign color="black" name="calendar" size={50} />
                                        ) : (
                                            <AntDesign color="black" name="check" size={50} />
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
