import {HTTP} from '@src/lib/request'
// import {IList} from '@src/apiModel/'

export function test(data: any) {
    return HTTP({url: '/api/user', method: 'get', data})
}
