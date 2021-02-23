/* eslint-disable */
import {createStore, compose} from 'redux'
import {rootReducer, RootState} from './reducer'

const composeEnhancers = (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const store = createStore(rootReducer, composeEnhancers())

store.replaceReducer(rootReducer)

export default store

export {
    RootState
}
