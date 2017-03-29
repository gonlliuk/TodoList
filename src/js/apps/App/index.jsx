import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import store from './store'
import * as actions from './store/constants'

import App from './app'

const render = (Component) => {
    ReactDom.render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        document.getElementById('app')
    )
}

render(App)

if (module.hot) {
    module.hot.accept('./app.jsx', (arg) => {
        const App = require('./app.jsx').default
        render(App)
    })
}

export default function({user, data}) {
    store.dispatch({
        type: actions.signIn,
        payload: user
    })

    store.dispatch({
        type: actions.getTodoList,
        payload: data
    })
}
