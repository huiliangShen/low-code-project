import {Moment} from 'moment'

export interface IBusinessQuery {
    page?: number
    size?: number
    mobile?: string
    name?: string
    register_date?: [Moment, Moment]
    review_status?: number
    start_time?: string
    end_time?: string
}

export interface IBusinessData {
    id: number
    review_status: number
    company_name: string
    mobile: string
    tax_num?: string
    business_licence_url?: string
    idurl_avatar?: string
    idurl?: string
    created_time?: string
    format_created_time?: string
    reason?: string
    datetime?: string
}
