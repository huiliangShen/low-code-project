/* eslint-disable */
import React from 'react'
import {PlusOutlined} from '@ant-design/icons'
import styles from './layout.module.scss'
import {IRouterFC} from '@model/common'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {renderRoutes} from '@src/routers'
import Side from './side'
import {Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Menu, Dropdown, Button} from 'antd'
import {TOKEN_NAME} from '@src/config'
import {useDispatch, useSelector} from 'react-redux'
import {handleSetUserInfo} from '@store/models/app/actions'
import {handleUpdateForm} from '@store/models/editor/actions'
import {RootState} from '@src/store'
// import {commonConfig} from '@routers/routerConfig'

const CommonLayout: React.FC<IRouterFC> = ({routes, location, ...props}) => {
    const dispatch = useDispatch()
    console.log(props)
    const {userData} = useSelector((state: RootState) => state.app)
    // const {pathname} = useLocation()
    console.log('common', renderRoutes(routes))
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

    const addNew = () => {
        dispatch(handleUpdateForm([]))
        props.history.push('/editor/home')
    }

    return (
        <div className={styles.idsLayout}>
            <section className={styles.idsContent}>
                <Side/>
                <main>
                    <header>
                        <div className={styles.mainHeader}>
                            <div className={styles.mainHeaderCollapse}/>
                            <Button type={'primary'} shape={'round'} icon={<PlusOutlined />} onClick={() => addNew()}>创建应用</Button>
                           {/* <Dropdown overlay={menu}>
                                <div className={styles.mainHeaderUser}>
                                     <div className={styles.mainHeaderUserImg}>1</div>
                                    <div className={styles.mainHeaderUserName}>{userData?.username}</div>
                                </div>
                            </Dropdown> */}
                        </div>
                    </header>
                    <div className={styles.mainContent}>
                         <TransitionGroup>
                            <CSSTransition key={location.pathname} timeout={500} classNames={'page-fade'}>
                                <Switch location={location}>
                                    {renderRoutes(routes)}
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    </div>
                </main>
            </section>
        </div>
    )
}

export default CommonLayout

CommonLayout.propTypes = {
    routes: PropTypes.array
}
