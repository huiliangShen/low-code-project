import * as constants from './action-types'
import {IFormItem} from '@src/pageModel/common'

export interface handleEditorAddItem {
    type: constants.EDITOR_ADD_ITEM,
    item: IFormItem
}

export interface handleSelectItem {
    type: constants.EDITOR_SET_ACTIVE_ITEM
    index: number
    activeData?: IFormItem
}

export interface handleUpdateForm {
    type: constants.EDITOR_UPDATE_FORM
    data: Array<IFormItem>
}

export interface handleRestForm {
    type: constants.EDITOR_REST_FORM
}

export interface handleRemove {
    type: constants.EDITOR_REMOVE_ITEM
    index: number
}

export declare type EnthusiasmAction = handleEditorAddItem | handleSelectItem | handleUpdateForm | handleRemove | handleRestForm

export function handleEditorAddItem(item: IFormItem): handleEditorAddItem {
    return {
        type: constants.EDITOR_ADD_ITEM,
        item
    }
}

export function handleSelectItem(index: number, item?: IFormItem): handleSelectItem {
    return {
        type: constants.EDITOR_SET_ACTIVE_ITEM,
        activeData: item,
        index
    }
}

export function handleUpdateForm(items: Array<IFormItem>): handleUpdateForm {
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

export function handleRestForm(): handleRestForm {
    return {
        type: constants.EDITOR_REST_FORM
    }
}
