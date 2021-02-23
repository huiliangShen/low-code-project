import React, {useEffect} from 'react'
import {Button, Spin} from 'antd'
import {LoadingOutlined, CloseOutlined} from '@ant-design/icons'
import {CSSTransition} from 'react-transition-group'
import styles from './drawer.module.scss'
import PropTypes from 'prop-types'
import {IDrawer} from '@components/types'

const antIcon = <LoadingOutlined style={{fontSize: 24}}/>

const Drawer: React.FC<IDrawer> = ({show, loading, name, canClickMask, children, close, footer, toggleShow}) => {
    useEffect(() => {
        if (show) {
            document.querySelector('body').style.overflow = 'hidden'
        } else {
            document.querySelector('body').style.overflow = ''
        }
    }, [show])
    return (
        <CSSTransition in={show} timeout={500} classNames="my-drawer" unmountOnExit>
            <div className={styles.drawerWrap} onClick={() => canClickMask && close}>
                <CSSTransition in={show} timeout={500} appear={true} classNames="my-drawer-content">
                    <div className={styles.drawerContent} onClick={(e) => {
                        e.stopPropagation()
                    }}>
                        <Spin spinning={loading} indicator={antIcon}>
                            <header className={styles.drawerContentHeader}>
                                {name}
                                <Button shape="circle" icon={<CloseOutlined/>} onClick={toggleShow}
                                        style={{float: 'right', marginTop: '13px'}}/>
                            </header>
                            <main className={styles.drawerContentMain}>
                                {children}
                            </main>
                            {footer && <footer className={styles.drawerContentFooter}>
                                {footer}
                            </footer>}
                        </Spin>
                    </div>
                </CSSTransition>
            </div>
        </CSSTransition>
    )
}

Drawer.defaultProps = {
    canClickMask: false,
    name: '新增',
    children: <h2 style={{textAlign: 'center'}}>暂无信息</h2>
}

Drawer.propTypes = {
    close: PropTypes.func,
    toggleShow: PropTypes.func,
    loading: PropTypes.bool,
    name: PropTypes.string,
    children: PropTypes.object,
    footer: PropTypes.object,
    show: PropTypes.bool,
    canClickMask: PropTypes.bool
}

export {
    Drawer
}
