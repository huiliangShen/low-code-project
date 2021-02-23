/**
 * 二维码管理
 */
import {Moment} from 'moment'

/**
 * 规则查询
 */
export interface ICodeQuery {
    page: number
    size: number
    /**
     * 页面上 标识规则查询
     */
    name: string
    /**
     * 页面需要，接口忽略
     */
    date?: [Moment, Moment]
    /**
     * 开始日期
     */
    start_time?: string
    /**
     * 结束日期
     */
    end_time?: string
}

/**
 * 规则列表
 */
export interface ICodeData {
    id?: number
    /**
     * 接口忽略，页面所需字段
     */
    demo: string
    /**
     * 规则
     */
    rule: string
    rule_name?: string
    /**
     * 说明
     */
    desc?: string
    created_at?: string
    updated_at?: string
}
