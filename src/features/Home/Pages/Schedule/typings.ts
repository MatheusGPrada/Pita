export interface AttendanceProps {
    status: boolean
}

export interface Attendance {
    dataAgendamento: string
    horario: string
    servico: Array<Service>
    idAgendamento: number
}

export interface Service {
    nomeServico: string
    precoServico: string
    id: string
}
