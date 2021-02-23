import {Moment} from 'moment'

export interface IActionQuery {
    page: number
    size: number
    date?: [Moment, Moment]
    start_time?: string
    end_time?: string
    admin_id?: number
}

export interface IActionData {
    id: number
    // 0：编辑，1：新增，2：删除
    action: number
    // 0：操作，1：审批
    type: number
    model_name: string
    content: string
    extra_id: number
    admin_id: number

    created_at: string
    updated_at: string
}

export interface ILoginQuery {
    page: number
    size: number
    date?: [Moment, Moment]
    start_time?: string
    end_time?: string
    admin_id?: number
    type?: string
}

export interface ILoginData {
    id: number
    // 解锁时间
    locked_time: string
    error_num: string
    admin_id: number
    username: string
    // 0：登录，1：登出，2：错误
    action: string

    created_at: string
    updated_at: string
    location: string
    terminal_type: string
    browser: string
}
