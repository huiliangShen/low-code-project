import {HTTP} from '@src/lib/request'
import axios from 'axios'

export interface IUserData {
    admin_id: number
    auth_list: string
    token: string
    username: string
}

export function login(data: {username: string, password: string, image_code: string, image_token?: string, browser?: string, os?: string}) {
    return HTTP<IUserData>({url: '/api/platform/user/login', method: 'post', data})
}

export function getGraphCode() {
    return axios.request({url: '/api/platform/graph/code', method: 'get', responseType: 'blob'})
}
