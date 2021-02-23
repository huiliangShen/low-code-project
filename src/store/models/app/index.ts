import {EnthusiasmAction} from './actions'
import * as actions from './action-types'
import {useSelector, TypedUseSelectorHook} from 'react-redux'
import {IUserData} from '@api/login'
import {TOKEN_NAME} from '@src/config'

const userData = localStorage.getItem(TOKEN_NAME)

interface StoreState {
    loading: boolean
    userData?: IUserData
}

const defaultStatus: StoreState = ({
    loading: false,
    userData: userData ? JSON.parse(userData) : null
})

export default (state: StoreState = defaultStatus, action: EnthusiasmAction): StoreState => {
    switch (action.type) {
        case actions.CHANGE_LOADING:
            return {...state, loading: action.loading}
        case actions.SET_LOGIN_INFO:
            return {
                ...state,
                userData: action.userData
            }
        default:
            return state
    }
}

export const useTypedSelector: TypedUseSelectorHook<StoreState> = useSelector
