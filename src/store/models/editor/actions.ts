import * as constants from './action-types'
import {IFormItem} from '@src/pageModel/common'

export interface handleEditorAddItem {
    type: constants.EDITOR_ADD_ITEM,
    item: IFormItem<any>
}

export interface handleSelectItem {
    type: constants.EDITOR_SET_ACTIVE_ITEM
    index: number
    activeData?: IFormItem<any>
}

export interface handleUpdateForm {
    type: constants.EDITOR_UPDATE_FORM
    data: Array<IFormItem<any>>
}

export interface handleRemove {
    type: constants.EDITOR_REMOVE_ITEM
    index: number
}

export declare type EnthusiasmAction = handleEditorAddItem | handleSelectItem | handleUpdateForm | handleRemove

export function handleEditorAddItem(item: IFormItem<any>): handleEditorAddItem {
    return {
        type: constants.EDITOR_ADD_ITEM,
        item
    }
}

export function handleSelectItem(index: number, item?: IFormItem<any>): handleSelectItem {
    return {
        type: constants.EDITOR_SET_ACTIVE_ITEM,
        activeData: item,
        index
    }
}

export function handleUpdateForm(items: Array<IFormItem<any>>): handleUpdateForm {
    return {
        type: constants.EDITOR_UPDATE_FORM,
        data: items
    }
}

export function handleRemove(index: number): handleRemove {
    return {
        type: constants.EDITOR_REMOVE_ITEM,
        index
    }
}
