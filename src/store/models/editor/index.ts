import {EnthusiasmAction} from './actions'
import * as actions from './action-types'
import {IFormItem} from '@src/pageModel/common'

interface StoreState {
    formData: Array<IFormItem>
    selectedFormData?: IFormItem
    activeIndex: number
}

const defaultStatus: StoreState = ({
    formData: [],
    selectedFormData: null,
    activeIndex: -1
})

export default (state: StoreState = defaultStatus, action: EnthusiasmAction): StoreState => {
    switch (action.type) {
        case actions.EDITOR_ADD_ITEM:
            return {...state, formData: [...state.formData, action.item]}
        case actions.EDITOR_SET_ACTIVE_ITEM:
            return {...state, activeIndex: action.index, selectedFormData: action.activeData}
        case actions.EDITOR_UPDATE_FORM:
            return {...state, formData: action.data}
        case actions.EDITOR_REMOVE_ITEM: {
            const forms = state.formData.map(e => e)
            forms.splice(action.index, 1)
            return {...state, formData: forms}
        }
        default:
            return state
    }
}
