import * as constants from './action-types'
import {IUserData} from '@api/login'

export interface ChangeLoading {
    type: constants.CHANGE_LOADING,
    loading: boolean
}

export interface setLoginInfo {
    type: constants.SET_LOGIN_INFO,
    userData: IUserData
}

export declare type EnthusiasmAction = ChangeLoading | setLoginInfo

export function handleChangeLoading(loading: boolean): ChangeLoading {
    return {
        type: constants.CHANGE_LOADING,
        loading
    }
}

export function handleSetUserInfo(userData: IUserData): setLoginInfo {
    return {
        type: constants.SET_LOGIN_INFO,
        userData
    }
}
