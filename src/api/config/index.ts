import {HTTP} from '@src/lib/request'
import {IConfigData, IConfigQuery} from '@apiModel/config'
import {IBusinessList} from '@apiModel/index'

export function getConfigList(data: IConfigQuery) {
    return HTTP<IBusinessList<IConfigData>>({url: '/api/platform/conf/app/mod/list', method: 'get', data})
}

export function getConfigDetail(data: {id: number}) {
    return HTTP<IConfigData>({url: '/api/platform/conf/app/mod/detail', method: 'post', data})
}

export function audit(data: {id: number, status: number, msg?: string}) {
    return HTTP({url: '/api/platform/conf/app/mod/review', method: 'post', data})
}
