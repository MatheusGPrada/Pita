import { Service } from '@features/Home/Pages/Schedule/typings'

export type HomeStackParamList = {
    Home: { patientInfo?: object }
    Account: { patientInfo?: object }
    Schedule: { patientInfo?: object }
    SelectService: { token: string; userName: string }
    SeeAll: { token: string; userId: string }
    ScheduleAttendance: { token: string; userName: string; servicos: Array<Service> }
}
