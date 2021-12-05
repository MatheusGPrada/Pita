export type HomeStackParamList = {
    Home: { patientInfo?: object }
    Account: { patientInfo?: object }
    Schedule: { patientInfo?: object }
    SelectService: { token: string }
    SeeAll: { token: string; userId: string }
}
