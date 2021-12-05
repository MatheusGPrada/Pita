export const formatedDateToSchedule = (dataAgendamento: string) =>
    dataAgendamento.substr(3, 2).concat('/', dataAgendamento.substr(0, 2), '/', dataAgendamento.substr(6, 4))
