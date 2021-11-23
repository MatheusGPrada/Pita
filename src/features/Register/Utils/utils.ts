import { isValidCPF } from '@brazilian-utils/brazilian-utils'
import { isEmpty } from '@utils/validations'
import { isValid } from 'date-fns'
import api from 'src/api/api'
import { REGISTER_USER } from 'src/api/endpoints'

export const validEmailRegex = /\S+@\S+\.\S+/

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

export const isValidEmail = async (email: string, setDisabled: Function) => {
    if (validEmailRegex.test(email)) {
        await setDisabled(false)
        return true
    }
    await setDisabled(true)
    return false
}

export const saveEmailInCache = async (email: string, cache) => {
    await cache.set('Email', email)
}

export const isValidPassword = async (password: string, setDisabled: Function) => {
    if (password.length > 0) {
        await setDisabled(false)
        return true
    }
    await setDisabled(true)
    return false
}

export const savePasswordInCache = async (password: string, cache) => {
    await cache.set('Password', password)
}

export const registerUser = async (cache: object) => {
    let result

    const {
        BirthDate: { value: birthDateValue },
        CPF: { value: cpfValue },
        Name: { value: nameValue },
        Email: { value: emailValue },
        PhoneNumber: { value: phoneValue },
        Password: { value: passwordValue },
    } = await cache.getAll()

    const userInfo = {
        cpf: cpfValue.replaceAll('.', '').replaceAll('-', ''),
        dataNascimento: birthDateValue,
        nome: nameValue,
        senha: passwordValue,
        telefone: phoneValue,
        userName: emailValue,
    }

    await api
        .post(REGISTER_USER, userInfo, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            const { data } = response
            result = data
        })
        .catch(error => {
            result = error
        })

    return result
}
