/**
 * 产品管理模块
 */
import {Moment} from 'moment'

export interface IProductQuery {
    page: number
    size: number
    /**
     * 产品名称
     */
    product_name?: string
    /**
     * 公司名称
     */
    company_name?: string
    /**
     * 产品批次号
     */
    code?: string
    /**
     * 页面需要，接口忽略此字段
     */
    date?: string | Moment
}

export interface IProductData {
    id: number
    product_name: string
    /**
     * 产品批次号
     */
    code: string
    /**
     * 手机号
     */
    phone: string
    /**
     * 环节数
     */
    link_number: number
    /**
     * 已上链环节数
     */
    chain_number: number
    /**
     * 公司名称
     */
    company_name: string

    created_at: string
    /**
     * 溯源记录
     */
    chains: IChains[]
}

export interface IChains {
    /**
     * 溯源记录节点名称
     */
    name: string
    list: IChainDetail[]
   /* /!**
     * 溯源记录节点title
     *!/
    title: string
    /!**
     * 视频
     *!/
    video: string[]
    /!**
     * 图片
     *!/
    img: string[]*/
}

export interface IChainDetail {
    id: number
    step_id: number
    title: string
    type: number
    locate: string
    hash: string
}
