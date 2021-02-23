/**
 * 配置管理模块
 */

/**
 * 模板审核查询
 */
export interface IConfigQuery {
    page_num: number
    page_size: number
    /**
     * 页面查询框 -> 股则编号
     */
    search: string
    /**
     * 审核状态
     * 1审核中 2审核成功 3审核失败
     */
    status: number
}

/**
 * 模板列表
 */
export interface IConfigData {
    id: number
    /**
     * 审核状态
     * 1审核中 2审核成功 3审核失败
     */
    status: number
    /**
     * 模板名称
     */
    name: string
    /**
     * 品牌名称
     */
    brand: string
    created_at: string
    /**
     * 品牌logo图
     */
    logo: string
    /**
     * 头部背景图像
     */
    hand_img: string

    msg: string
}
