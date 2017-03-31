import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware, push } from 'react-router-redux'
import { createBrowserHistory }  from 'history'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import * as reducers from './reducers'

const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
})

const middlewares = [
    logger(),
    thunk,
    routerMiddleware(createBrowserHistory())
]

const initialState = {
    user: {},
    todoList: []
}

const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares))

if (module.hot) {
    module.hot.accept('./reducers', () => {
        const reducers = require('./reducers/')
        const nextRootReducer = combineReducers({
            ...reducers,
            routing: routerReducer
        })
        store.replaceReducer(nextRootReducer)
    })
}

export default store
