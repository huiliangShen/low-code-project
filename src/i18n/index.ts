import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import en from './en'
import zh from './zh'

const resources = {
    en,
    zh
}

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        ns: ['common', 'source'],
        defaultNS: 'common',
        resources,
        lng: 'zh',
        keySeparator: false, // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    })

export default i18n
