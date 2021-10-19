import { isValidCPF } from '@brazilian-utils/brazilian-utils'
import { isEmpty } from '@utils/validations'
import { isValid } from 'date-fns'

export const validAllInfo = async (name: string, cpf: string, birthDate: string, setDisabled: Function) => {
    const elements = birthDate.split('/')
    if (!isEmpty(name) && !isEmpty(cpf) && elements.length === 3) {
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
