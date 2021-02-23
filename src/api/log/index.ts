import {HTTP} from '@src/lib/request'
import {IActionQuery, IActionData, ILoginQuery, ILoginData} from '@apiModel/log'
import {IList} from '@apiModel/index'

export function getActionList(data: IActionQuery) {
    return HTTP<IList<IActionData>>({url: '/api/platform/log/action/list', method: 'get', data})
}

export function getReviewList(data: IActionQuery) {
    return HTTP<IList<IActionData>>({url: '/api/platform/log/review/list', method: 'get', data})
}

export function getLoginList(data: ILoginQuery) {
    return HTTP<IList<ILoginData>>({url: '/api/platform/log/login/list', method: 'post', data})
}

export function getTerminalType() {
    return HTTP<{terminal_type: string[]}>({url: '/api/platform/log/terminal/list', method: 'get'})
}

export function getModules() {
    return HTTP<string[]>({url: '/api/platform/log/model/down/list', method: 'get'})
}
