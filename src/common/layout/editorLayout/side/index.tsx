/* eslint-disable */
import styles from '../layout.module.scss'
import React, {useEffect, useState} from 'react'
import {useLocation, Link, useRouteMatch} from 'react-router-dom'
import {commonConfig as routesConfig} from '@routers/routerConfig'
import {RouteConfigDeclaration} from '@model/common'
import PropTypes from 'prop-types'
import {Menu} from 'antd'
import {getSideRoutes} from '@routers/index'
import logo from '@assets/img/logo.png'

const {SubMenu} = Menu

interface ICustomLink {
    icon?: string
    to: string
    name: string
    children?: React.ReactNode
    pathname?: string
    oldTo?: string
}

const CustomLink: React.FC<ICustomLink> = ({icon, to, name, pathname, oldTo}) => {
    const [otherMatch, setOtherMatch] = useState(false)
    const match = useRouteMatch({
        path: to,
        exact: true
    })

    const judgePathName = () => {
        if (pathname && pathname.indexOf(oldTo) > -1) {
            setOtherMatch(true)
        } else {
            setOtherMatch(false)
        }
    }

    useEffect(() => {
        judgePathName()
    }, [pathname])

    // const type = match || otherMatch ? '2' : '1'
    // @ts-ignore
    // const iconUrl = imgs[`img${icon}${type}`]

    return (
        <Link to={to}>{name}</Link>
    )
}

CustomLink.propTypes = {
    icon: PropTypes.string,
    to: PropTypes.string,
    name: PropTypes.string,
    pathname: PropTypes.string,
    oldTo: PropTypes.string,
    children: PropTypes.any
}

const CustomChildLink: React.FC<ICustomLink> = ({to, name}) => {
    const match = useRouteMatch({
        path: to,
        exact: true
    })

    return (
        <Link to={to}
              className={match ? `${styles.subMenuItemLink} ${styles.activeLink}` : styles.subMenuItemLink}
              key={to}>
            {name}
        </Link>
    )
}

CustomChildLink.propTypes = {
    to: PropTypes.string,
    name: PropTypes.string
}

const Side = () => {
    const [openKeys, setOpenKeys] = useState<string[]>([])
    const [defaultKeys] = useState<string[]>([])
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])
    const {pathname} = useLocation()
    const routes = getSideRoutes(routesConfig)
    // console.log(routes, '11111')

    const onOpenChange = (keys: string[]) => {
       // console.log(keys)
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
        const rootSubmenuKeys = routes.map(e => e.children && e.key)
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys)
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
        }
    }

    const renderSubMenu = (data: RouteConfigDeclaration[]) => (
        data.map((item) => {
            if (item.children && !item.isRedirect) {
                return (
                    <SubMenu key={item.key} title={item.name}
                             icon={item.icon && <i className={`iconfont ${item.icon}`}/>}>
                        {
                            renderSubMenu(item.children)
                        }
                    </SubMenu>
                )
            } else if (item.children && item.isRedirect) {
                return <Menu.Item key={item.children[0].key} icon={item.icon && <i className={`iconfont ${item.icon}`}/>}>
                    <CustomLink key={item.children[0].path} pathname={pathname} to={item.children[0].path}
                                name={item.name} icon={item.icon}/>
                </Menu.Item>
            } else {
                return <Menu.Item key={item.key} icon={item.icon && <i className={`iconfont ${item.icon}`}/>}>
                    <CustomLink key={item.path} pathname={pathname} to={item.path} name={item.name} icon={item.icon}/>
                </Menu.Item>
            }
        })
    )

    useEffect(() => {
        // 路由变化
        configDefaultOpenKeys()
    }, [pathname])

    const configDefaultOpenKeys = () => {
        // console.log('side', pathname)
        const _path = pathname
        const pathIndex = _path.lastIndexOf('/')
        const path = _path.substring(0, pathIndex)
        const menusItems: RouteConfigDeclaration[] = []
        const rootSubmenuItems: RouteConfigDeclaration[] = []
        routes.forEach(item => {
            if (item.children) {
                item.children.forEach(e => {
                    menusItems.push(e)
                })
                rootSubmenuItems.push(item)
            } else {
                menusItems.push(item)
            }
        })
        const exist = rootSubmenuItems.filter(e => e.path === path)
        if (exist.length > 0) {
            setOpenKeys([exist[0].key])
        }
        const exitMenus = menusItems.filter(e => e.path === _path)
        if (exitMenus.length > 0) {
            setSelectedKeys([exitMenus[0].key])
        }
    }

    return (
        <aside>
            <div className={styles.menuSideContent}>
                <div className={styles.menuSideLogo}>
                    <img src={logo} alt=""/>
                    <h3>溯源平台后台管理系统</h3>
                </div>
                <div className={styles.menuList}>
                    <Menu mode="inline" style={{width: '100%'}}
                          openKeys={openKeys}
                          inlineCollapsed={false}
                          defaultOpenKeys={defaultKeys}
                          onOpenChange={onOpenChange}
                          selectedKeys={selectedKeys}>
                        {renderSubMenu(routes)}
                    </Menu>
                </div>
            </div>
        </aside>
    )
}

export default Side
