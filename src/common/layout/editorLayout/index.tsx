/* eslint-disable */
import React from 'react'
import {Button, message, Space} from 'antd'
import styles from './layout.module.scss'
import {IRouterFC} from '@model/common'
import {renderRoutes} from '@src/routers'
import {Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Menu} from 'antd'
import {TOKEN_NAME} from '@src/config'
import {useDispatch, useSelector} from 'react-redux'
import {handleSetUserInfo} from '@store/models/app/actions'
import {RootState} from '@src/store'
import eventBus from '@lib/eventBus'
// import {commonConfig} from '@routers/routerConfig'

const EditorLayout: React.FC<IRouterFC> = ({routes, location, history}) => {
    const dispatch = useDispatch()
    // const {userData} = useSelector((state: RootState) => state.app)
    const {formData} = useSelector((state: RootState) => state.editor)
    // const {pathname} = useLocation()
    console.log('editor', renderRoutes(routes))
    const handleOnExit = () => {
        dispatch(handleSetUserInfo(null))
        localStorage.removeItem(TOKEN_NAME)
        window.location.reload()
    }
    console.log(history)
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

    const handleSaveXml = () => {
        eventBus.emit('saveXml')
    }

    return (
        <div className={styles.idsLayout}>
            <section className={styles.idsContent}>
                <main>
                    <header>
                        <div className={styles.mainHeader}>
                            <Button shape={'round'} onClick={() => history.push('/home/index')}
                                    style={{float: 'left'}}>返回</Button>
                            <div className={styles.mainHeaderCollapse}>
                                {history.location.pathname.indexOf('/editor/preview') === -1 &&
                                <ul className={styles.mainHeaderCollapseList}>
                                    <li className={styles.mainHeaderCollapseItem}
                                        onClick={() => history.push('/editor/home')}>
                                        表单设计
                                    </li>
                                    <li className={styles.mainHeaderCollapseItem}
                                        onClick={() => history.push('/editor/process')}>
                                        流程设计
                                    </li>
                                    <li className={styles.mainHeaderCollapseItem}
                                        onClick={() => history.push('/editor/publish')}>
                                        发布
                                    </li>
                                </ul>}
                            </div>
                            <Space>
                                {/* <Button shape={'round'} onClick={() => history.push('/editor/preview')}>预览</Button> */}
                                {
                                    history.location.pathname.indexOf('/editor/process') > -1 &&
                                    <Button shape={'round'} type={'primary'}
                                            onClick={() => handleSaveXml()}>保存流程</Button>
                                }
                                {
                                    history.location.pathname.indexOf('/editor/home') > -1 &&
                                    <Button shape={'round'} type={'primary'} onClick={() => handleSave()}>保存表单</Button>
                                }
                                {
                                    history.location.pathname.indexOf('/editor/home') === -1 && history.location.pathname.indexOf('/editor/process') === -1 &&
                                    <Button style={{visibility: 'hidden'}} shape={'round'} type={'primary'}
                                            onClick={() => handleSave()}>保存表单</Button>
                                }
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
