import {HTTP} from '@src/lib/request'
import {IBusinessQuery, IBusinessData} from '@apiModel/business'
import {IList} from '@apiModel/index'

export function getBusinessList(data: IBusinessQuery) {
    return HTTP<IList<IBusinessData>>({url: '/api/platform/store/user/list', method: 'get', data})
}

export function getBusinessDetail(data: {id: number}) {
    return HTTP<IBusinessData>({url: '/api/platform/store/user/detail', method: 'get', data})
}

export function audit(data: {id: number, status: number, extra?: string}) {
    return HTTP({url: '/api/platform/store/user/review', method: 'post', data})
}
