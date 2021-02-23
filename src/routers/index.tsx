import React from 'react'
import {Spin} from 'antd'
import {Route, Redirect} from 'react-router-dom'
import {RouteConfigDeclaration} from '@src/pageModel/common'
import {createBrowserHistory} from 'history'
import {TOKEN_NAME} from '@src/config'
import {IUserData} from '@api/login'

export const history = createBrowserHistory()

export function renderRoutes(routesConfig: RouteConfigDeclaration[], extraProps: any = {}) {
    // const powerRoutes = routesConfig.filter(e => e.pow)
    // console.log(location)
    return routesConfig.map((item) => {
        const {
            path,
            router = null,
            exact,
            isDynamic,
            // isProtected,
            children = [],
            loadingFallback,
            redirect = null
            // authCode = []
            // isRedirect
        } = item

        return (
            <Route
                key={path}
                path={router || path}
                exact={exact}
                render={(props: any) => {
                    if (redirect) {
                        return <Redirect to={redirect}/>
                    }
                    if (isDynamic) {
                        return (
                            <React.Suspense fallback={loadingFallback || <div style={{
                                height: '90vh',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}><Spin size="large"/></div>}>
                                <item.component item={item} {...props} {...extraProps} routes={item}/>
                            </React.Suspense>
                        )
                    }
                    return <item.component item={item} {...props} {...extraProps} routes={children}/>
                }}
            />
        )
    })
}

export function getSideRoutes(routes: RouteConfigDeclaration[], isBread: boolean = false) {
    let result: RouteConfigDeclaration[] = []
    for (const item of routes) {
        // 加权限判断，没有权限的统一过滤
        const {authCode = []} = item
        if (authCode.length && !getAuth(authCode)) {
            continue
        }
        if (item.hidden) {
            if (isBread && item.children && item.isRedirect) {
                const newItem = JSON.parse(JSON.stringify(item))
                newItem.children = getSideRoutes(item.children, isBread)
                result = [...result, newItem]
            } else if (item.children && item.children.length > 0) {
                result = [...result, ...getSideRoutes(item.children, isBread)]
            } else if (isBread && !item.children) {
                result = [...result, item]
            }
        } else {
            if (item.children && item.children.length > 0) {
                const newItem = JSON.parse(JSON.stringify(item))
                newItem.children = getSideRoutes(item.children, isBread)
                result = [...result, newItem]
            } else {
                result = [...result, item]
            }
        }
    }
    return result
}

export function getAuth(code: string []) {
    const token = localStorage.getItem(TOKEN_NAME)
    const auths = JSON.parse(token) as IUserData
    if (!auths || !auths.auth_list) {
        return false
    }
    if (auths.auth_list === 'all') {
        return true
    }

    const list = auths.auth_list.split(',')

    return code.some(e => list.includes(e))
}
