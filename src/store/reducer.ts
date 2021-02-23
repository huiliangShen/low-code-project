import {combineReducers} from 'redux'
import {app, editor} from './models'

export const rootReducer = combineReducers({
    app,
    editor
})
/* eslint-disable */
export declare type RootState = ReturnType<typeof rootReducer>
