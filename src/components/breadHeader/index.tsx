import {Breadcrumb} from 'antd'
import React, {Fragment, useEffect, useState} from 'react'
import {RouteConfigDeclaration} from '@model/common'
import {getSideRoutes} from '@routers/index'
import {commonConfig as routesConfig} from '@routers/routerConfig'
import {useLocation, Link} from 'react-router-dom'
import {home} from '@config/index'
import PropTypes from 'prop-types'

const routes = getSideRoutes(routesConfig, true)
console.log(routes)
const titleStyles = {
    margin: '8px 0 0',
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '32px',
    display: 'inline-block'
}

interface IBreadHeader {
    title?: string
    nowLinkName?: string
    renderChildren?: React.ReactNode
}

const BreadHeader: React.FC<IBreadHeader> = ({title, nowLinkName, renderChildren}) => {
    const {pathname} = useLocation()
   // console.log(pathname, useLocation())
    const [paths, setPaths] = useState<RouteConfigDeclaration[]>([])
    useEffect(() => {
        getPath()
    }, [pathname])

    function getPath() {
        const result = configDefaultOpenKeys(pathname, routes)
        // console.log(result, pathname)
        result.unshift({
            name: '首页',
            path: home
        })
        setPaths(result)
    }

    return (
        <Fragment>
            <Breadcrumb>
                {
                    paths.map((item, key) => {
                        if (key === paths.length - 1) {
                            return !nowLinkName ? <Breadcrumb.Item key={key}>{item.name}</Breadcrumb.Item> : <Breadcrumb.Item key={key}>{nowLinkName}</Breadcrumb.Item>
                        } else {
                            return <Breadcrumb.Item key={key}>
                                <Link to={item.path}>{item.name}</Link>
                            </Breadcrumb.Item>
                        }
                    })
                }
            </Breadcrumb>
            {!title && <h2 style={titleStyles}>{paths[paths.length - 1]?.name || ''}</h2>}
            {title && <h2 style={titleStyles}>{title}</h2>}
            {renderChildren}
        </Fragment>
    )
}

export default BreadHeader

BreadHeader.propTypes = {
    nowLinkName: PropTypes.string,
    title: PropTypes.string,
    renderChildren: PropTypes.element
}

function configDefaultOpenKeys(pathname: string, routers: RouteConfigDeclaration[]) {
    let menusItems: RouteConfigDeclaration[] = []
    // 打平数组
    const lowRoutes = flatRoutes(routers)
    const targetRoute = lowRoutes.find(e => e.path === pathname)
    const fatherKeys = targetRoute?.key.split('')
    // = 1 证明只有一级
    if (fatherKeys && fatherKeys.length > 1) {
        fatherKeys.pop()
        while (fatherKeys.length) {
            const key = fatherKeys.pop()
            const fRoute = lowRoutes.filter(e => e.key === key)
            menusItems = [...fRoute, ...menusItems]
        }
    }
    return [...menusItems, targetRoute]
}

function flatRoutes(routers: RouteConfigDeclaration[]): RouteConfigDeclaration[] {
    return routers.reduce((pre, item) => {
        if (item.children && item.children.length) {
            return pre.concat(flatRoutes(item.children)).concat(Object.assign(item, {path: item.children[0].path}))
        } else {
            return pre.concat(item)
        }
    }, [])
}
