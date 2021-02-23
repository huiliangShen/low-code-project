import history from 'history'
export interface IRouterFC {
    routes?: RouteConfigDeclaration[]
    item?: RouteConfigDeclaration
    location?: history.Location
}

export interface RouteConfigDeclaration {
    /**
     * 当前路由路径
     */
    path: string
    /**
     * 当前router渲染的路由路径
     */
    router?: string
    /**
     * 当前路由名称
     */
    name?: string
    /**
     * 是否严格匹配路由
     */
    exact?: boolean
    /**
     * 是否需要路由鉴权
     */
    isProtected?: boolean
    /**
     * 是否需要路由重定向
     */
    isRedirect?: boolean
    /**
     * 重定向的路由
     */
    redirect?: string
    /**
     * 是否需要动态加载路由
     */
    isDynamic?: boolean
    /**
     * 动态加载路由时的提示文案
     */
    loadingFallback?: string
    /**
     * 路由组件
     */
    component?: any
    /**
     * 子路由
     */
    children?: RouteConfigDeclaration[]
    /**
     * 是否展示在侧栏
     */
    hidden?: boolean
    /**
     * 图标
     */
    icon?: string
    /**
     * key
     */
    key?: string
    fKey?: string,
    authCode?: string[]
}

export interface IFormItem<T> {
    id?: number | string
    type: number
    formConfigData: IFormConfigData
    colSpan?: number
    rule?: string
    colon?: boolean
    data?: T
}

export interface IFormConfigData {
    label: string
    require?: boolean
    name?: string
    placeholder?: string
    rows?: number
    options?: string[]
}
