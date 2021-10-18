import { isValid } from 'date-fns'

export const isEmpty = (str?: string) => !str || 0 === str.length

export const validDate = (date: string) => {
    const elements = date.split('/')
    if (elements.length === 3) {
        return isValid(new Date(elements[2].concat('/', elements[1], '/', elements[0]))) && parseInt(elements[0], 10) <= 31
    }
    return false
}
