import React, { FC, useState, useCallback } from 'react'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { DarkTemplate } from '@components/templates/DarkTemplate/DarkTemplate'
import { Card, CardInfo, IconContainer, Content, LoadingContainer, ServiceInfo, ServiceTitle, Title, CardService } from './styles'
import { i18n } from '@i18n'
import api from 'src/api/api'
import { Loading } from '@components/atoms/Loading/Loading'
import { ALL_SERVICES } from 'src/api/endpoints'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'

AntDesign.loadFont()

export const SelectService: FC = () => {
    const [loading, setLoading] = useState(true)
    const [services, setServices] = useState([])
    const [update, setUpdate] = useState('')
    const [selectedServices, setSelectedServices] = useState([])
    const {
        params: { token },
    } = useRoute()

    useFocusEffect(
        useCallback(() => {
            const getServices = async () => {
                await api
                    .get(ALL_SERVICES, {
                        headers: {
                            Authorization: token,
                            'Content-Type': 'application/json',
                        },
                    })
                    .then(response => {
                        const { data } = response
                        setLoading(false)
                        setServices(data)
                    })
                    .catch(requestError => {
                        setLoading(false)
                        setServices(requestError)
                    })
            }
            getServices()
        }, [token]),
    )

    const isSelected = useCallback((id: number) => selectedServices.findIndex(service => service.id === id) >= 0, [
        selectedServices,
        update,
    ])

    const selectService = (id: string, title: string) => {
        const alreadySelected = selectedServices
        if (alreadySelected.filter(service => service.id === id).length === 0) {
            setUpdate(Math.random())
            alreadySelected.push({ id: id, title: title })
            setSelectedServices(alreadySelected)
            return
        }
        alreadySelected.splice(
            alreadySelected.findIndex(service => service.id === id),
            1,
        )
        setUpdate(Math.random())
    }

    return (
        <DarkTemplate>
            <Title>{i18n.t('title.selectServices')}</Title>
            <Content>
                {loading && (
                    <LoadingContainer>
                        <Loading isBlue={false} size={80} />
                    </LoadingContainer>
                )}
                {services.length > 0 && (
                    <ScrollView>
                        {services.map(({ id, nomeServico, precoServico, tempoServico }) => (
                            <TouchableOpacity key={id} onPress={() => selectService(id, nomeServico)}>
                                <Card>
                                    <CardService>
                                        <ServiceTitle>{nomeServico}</ServiceTitle>
                                        <CardInfo>
                                            <ServiceInfo>{`R$ ${precoServico},00`}</ServiceInfo>
                                            <ServiceInfo>{tempoServico}</ServiceInfo>
                                        </CardInfo>
                                    </CardService>
                                    <IconContainer>
                                        {isSelected(id) && <AntDesign color="black" name="check" size={30} />}
                                    </IconContainer>
                                </Card>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
            </Content>
        </DarkTemplate>
    )
}
