import i18n from 'i18next'

import { messages } from './languages/'

i18n.init({
    debug: false,
    defaultNS: 'translations',
    fallbackLng: 'pt',
    ns: ['translations', 'onboarding'],
    react: {
        wait: true,
    },
    resources: messages,
})

export { i18n }
