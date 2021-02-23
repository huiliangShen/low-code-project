import {HTTP} from '@src/lib/request'
import {IAccountData, IAccountQuery, IRoleData, IRoleQuery} from '@apiModel/account'
import {IList} from '@apiModel/index'

export function getAccountList(data: IAccountQuery) {
    return HTTP<IList<IAccountData>>({url: '/api/platform/user/list', method: 'get', data})
}

export function addAccount(data: IAccountData) {
    return HTTP({url: '/api/platform/user/add', method: 'post', data})
}

export function removeAccount(data: {id: string}) {
    return HTTP({url: '/api/platform/user/delete', method: 'post', data})
}

export function removeRole(data: {id: number[]}) {
    return HTTP({url: '/api/platform/user/role/delete', method: 'post', data})
}

export function setEnable(data: {id: number, status: number}) {
    return HTTP({url: '/api/platform/user/stop', method: 'post', data})
}

export function getRoleList(data: IRoleQuery) {
    return HTTP<IList<IRoleData>>({url: '/api/platform/user/role/list', method: 'get', data})
}

export function getAccountDetail(data: {id: number}) {
    return HTTP<IAccountData>({url: '/api/platform/user/detail', method: 'get', data})
}

/**
 * 下拉列表
 */
export function getRoles() {
    return HTTP<IList<IRoleData>>({url: '/api/platform/user/role/down/list', method: 'get'})
}

export function getPowerById(data: {id: number}) {
    return HTTP<IRoleData>({url: '/api/platform/user/role/detail', method: 'get', data})
}

export function getPower() {
    return HTTP<any>({url: '/api/platform/menu/list', method: 'get'})
}

export function saveRolePower(data: {id: number, value: string}) {
    return HTTP({url: '/api/platform/user/role/set', method: 'post', data})
}

export function saveUserPower(data: {id: number, value: string}) {
    return HTTP({url: '/api/platform/user/auth/set', method: 'post', data})
}

/*
export function getPowerByRoleId(data: {id: number}) {
    return HTTP<IPowerData[]>({url: '/api/account/getRolesById', method: 'get', data})
}
*/
export function updatePassword(data: {id: number, password: string}) {
    return HTTP({url: '/api/platform/user/modify/password', method: 'post', data})
}

export function addRole(data: IRoleData) {
    return HTTP({url: '/api/platform/user/role/add', method: 'post', data})
}

export function sendCapture(data: {phone: string}) {
    return HTTP({url: '/api/config/audit', method: 'post', data})
}
/**
 * 用户权限设置
 * @param data
 */
export function accountAuthSet(data: {id: number, value: string}) {
    return HTTP({url: '/api/platform/user/auth/set', method: 'post', data})
}
/**
 * 角色权限设置
 * @param data
 */
export function roleAuthSet(data: {id: number, value: string}) {
    return HTTP({url: '/api/platform/user/role/auth/set', method: 'post', data})
}

export function getUserDownList() {
    return HTTP<IList<IAccountData>>({url: '/api/platform/user/down/list', method: 'get'})
}
