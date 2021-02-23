import {HTTP} from '@src/lib/request'
import {ICodeQuery, ICodeData} from '@apiModel/qrcode'
import {IList} from '@apiModel/index'

export function getCodeList(data: ICodeQuery) {
    return HTTP<IList<ICodeData>>({url: '/api/platform/qr/code/list', method: 'get', data})
}

export function save(data: ICodeData) {
    return HTTP({url: '/api/platform/qr/code/add', method: 'post', data})
}
