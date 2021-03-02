import {HTTP} from '@src/lib/request'
import {IBusinessQuery, IBusinessData} from '@apiModel/business'
import {IList} from '@apiModel/index'

const baseURI = process.env.NODE_ENV === 'development' ? '/api' : ''

export function getBusinessList(data: IBusinessQuery) {
    return HTTP<IList<IBusinessData>>({url: '/api/platform/store/user/list', method: 'get', data})
}

export function getBusinessDetail(data: { id: number }) {
    return HTTP<IBusinessData>({url: '/api/platform/store/user/detail', method: 'get', data})
}

export function audit(data: { id: number, status: number, extra?: string }) {
    return HTTP({url: '/api/platform/store/user/review', method: 'post', data})
}

export function getList(data: { userId: number }) {
    return HTTP({url: baseURI + '/task', method: 'get', data})
}

export function getProcessList() {
    return HTTP({url: baseURI + '/process', method: 'get'})
}

export function deploy(data: FormData) {
    return HTTP({url: baseURI + '/deploy', method: 'post', data})
}

export function startProcess(data: any) {
    return HTTP({url: baseURI + '/process', method: 'post', data})
}

export function verify(data: { taskId: string, approved: boolean }) {
    return HTTP({url: baseURI + '/verify', method: 'post', data})
}
