/* eslint-disable */
import React from 'react'
import {Button, message, Space} from 'antd'
import styles from './layout.module.scss'
import {IRouterFC} from '@model/common'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {renderRoutes} from '@src/routers'
// import Side from './side'
import {Switch,useHistory} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Menu, Dropdown} from 'antd'
import {TOKEN_NAME} from '@src/config'
import {useDispatch, useSelector} from 'react-redux'
import {handleSetUserInfo} from '@store/models/app/actions'
import {RootState} from '@src/store'
// import {commonConfig} from '@routers/routerConfig'

const EditorLayout: React.FC<IRouterFC> = ({routes, location}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {userData} = useSelector((state: RootState) => state.app)
    const {formData} = useSelector((state: RootState) => state.editor)
    // const {pathname} = useLocation()
    // console.log('common', renderRoutes(routes))
    const handleOnExit = () => {
        dispatch(handleSetUserInfo(null))
        localStorage.removeItem(TOKEN_NAME)
        window.location.reload()
    }

    // console.log('layout', pathname)
    const menu = (
        <Menu>
            <Menu.Item>
                <a onClick={handleOnExit}>退出登陆</a>
            </Menu.Item>
        </Menu>
    )

    const handleSave = () => {
        sessionStorage.setItem('formData', JSON.stringify(formData))
        message.success('保存成功')
    }

    return (
        <div className={styles.idsLayout}>
            <section className={styles.idsContent}>
                {/* <Side/> */}
                <main>
                    <header>
                        <div className={styles.mainHeader}>
                            <div className={styles.mainHeaderCollapse}/>
                            <Space>
                                <Button shape={'round'} onClick={() => history.push('/editor/preview')}>预览</Button>
                                <Button shape={'round'} type={'primary'} onClick={() => handleSave()}>保存</Button>
                            </Space>
                        </div>
                    </header>
                    <div className={styles.mainContent}>
                        <Switch location={location}>
                            {renderRoutes(routes)}
                        </Switch>
                    </div>
                </main>
            </section>
        </div>
    )
}

export default EditorLayout

EditorLayout.propTypes = {
    routes: PropTypes.array
}
