/* eslint-disable */
import {hot} from 'react-hot-loader/root'
// import {useTranslation} from 'react-i18next'
// import {useDispatch, useSelector} from 'react-redux'
// import {RootState} from '@src/store'
import React from 'react'
// import {Locale} from 'antd/es/locale-provider'
import zhCN from 'antd/es/locale/zh_CN'
// import {handleChangeLoading} from '@store/models/app/actions'
// import enUS from 'antd/es/locale/en_US'
import {ConfigProvider} from 'antd'
import App from './App'
// import {colorRgb} from '@lib/index'
// import moment from 'moment'
import 'moment/locale/zh-cn'

const Entry = () => {
    console.log('entry')
   /* const {i18n} = useTranslation()
    const {language, primaryColor} = useSelector((state: RootState) => state.app)
    const dispatch = useDispatch()
    const [antLanguage, setAntLanguage] = useState<Locale>(zhCN)

    const changeLoading = (loading: boolean) => {
        dispatch(handleChangeLoading(loading))
    } */

    /*  useEffect(() => {
        changeLanguage()
    }, [language])

    useEffect(() => {
        changeColor()
    }, [primaryColor])

    function changeLanguage() {
        changeLoading(true)
        const lang = language || localStorage.getItem('language')
        let code: { momentLang: string, antLang: Locale, i18nLang: string }
        switch (lang) {
            case 'zh':
                code = {
                    momentLang: 'zh-cn',
                    antLang: zhCN,
                    i18nLang: 'zh'
                }
                break
            case 'en':
                code = {
                    momentLang: 'en',
                    antLang: enUS,
                    i18nLang: 'en'
                }
                break
            default:
                code = {
                    momentLang: 'zh-cn',
                    antLang: zhCN,
                    i18nLang: 'zh'
                }
        }

        i18n.changeLanguage(code.i18nLang).then(() => {
            changeLoading(false)
            moment.locale(code.momentLang)
            setAntLanguage(code.antLang)
            localStorage.setItem('language', lang)
        }).catch((error: string) => {
            changeLoading(false)
            message.error(`Failed to update language ${error}`)
        })
    }

    function changeColor() {
        changeLoading(true)
        const rgb = colorRgb(primaryColor)
        const ljs = (window as any).less

        ljs && ljs.modifyVars({
            '@primary-color': primaryColor
        }).then(() => {
            changeLoading(false)
            document.documentElement.style.setProperty('--ids-primary-theme', primaryColor)
            document.documentElement.style.setProperty('--ids-primary-opacity-theme', `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.8)`)
        }).catch((error: any) => {
            changeLoading(false)
            message.error(`Failed to update theme ${error}`)
        })
    } locale={antLanguage} */

    return (
        <ConfigProvider locale={zhCN}>
            {/* <BrowserRouter>
                <Switch>
                    {renderRoutes(routesConfig)}
                </Switch>
            </BrowserRouter> */}
            <App/>
        </ConfigProvider>
    )
}

export default hot(Entry)
