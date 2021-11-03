import { isValidCPF } from '@brazilian-utils/brazilian-utils'
import { isEmpty } from '@utils/validations'
import { isValid } from 'date-fns'

export const isValidUserInfo = async (name: string, cpf: string, birthDate: string, setDisabled: Function) => {
    const elements = birthDate.split('/')
    if (!isEmpty(name) && !isEmpty(cpf) && elements.length === 3 && birthDate.length === 10) {
        if (isValidCPF(cpf) && isValid(new Date(elements[2].concat('/', elements[1], '/', elements[0])))) {
            await setDisabled(false)
            return true
        }
    }
    await setDisabled(true)
    return false
}

export const saveUserInfoInCache = async (name: string, cpf: string, birthDate: string, cache) => {
    await cache.set('Name', name)
    await cache.set('CPF', cpf)
    await cache.set('BirthDate', birthDate)
}

export const isValidPhoneNumber = async (phoneNumber: string, setDisabled: Function) => {
    if (phoneNumber.length === 15) {
        await setDisabled(false)
        return true
    }
    await setDisabled(true)
    return false
}

export const savePhoneNumberInCache = async (phoneNumber: string, cache) => {
    await cache.set('PhoneNumber', phoneNumber)
}
