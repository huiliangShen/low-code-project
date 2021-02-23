export interface IAccountQuery {
    page: number
    size: number
    name?: string
    role_id?: number
}

export interface IAccountData {
    /* id?: number
    account?: string
    phone?: number
    name?: string
    mail?: string
    role_name?: string
    create_at?: string
    last_login_time?: string
    is_enable?: number
    description?: string */

    created_at?: string
    id?: number
    ip?: string
    // 是否删除，1：删除
    is_delete?: number
    RoleIds?: Array<{role_id: number, name: string}>
    role_ids?: any
    /**
     * 最后登录时间
     */
    login_time?: string
    mobile?: string
    password?: string
    confirm_password?: string
    remark?: string
    /**
     * 0：正常，1：停用
     */
    status?: number
    true_name?: string
    updated_at?: string
    /**
     * 0：普通用户，1：超管
     */
    user_type?: number
    username?: string
    /**
     * value值
     */
    value?: string
}

export interface IRoleQuery {
    page: number
    size: number
}

export interface IRoleData {
    id: number
    name: string
    desc: string
    created_at: string
    // 0：正常，1：已删除
    is_delete: number
    value: string
}

export interface IPowerData {
    id: number
    name: string
    children?: IPowerData[]
}
