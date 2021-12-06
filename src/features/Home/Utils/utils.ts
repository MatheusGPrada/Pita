export const formatedDateToSchedule = (dataAgendamento: string) =>
    dataAgendamento.substr(3, 2).concat('/', dataAgendamento.substr(0, 2), '/', dataAgendamento.substr(6, 4))

export const SumHour = (startHour: string, valueToSum: number) => {
    const hour = parseInt(startHour.substr(0, 2), 10)
    const minutes = parseInt(startHour.substr(3, 2), 10)
    const startDate = new Date(Date.UTC(2000, 1, 1, hour, minutes))
    startDate.setMinutes(startDate.getMinutes() + valueToSum)

    return `${startDate.getUTCHours()}:${startDate.getMinutes().toString() === '0' ? '00' : startDate.getMinutes().toString()}`
}
