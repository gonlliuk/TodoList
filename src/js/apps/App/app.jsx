import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Redirect, Switch } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { createBrowserHistory }  from 'history'
import * as Routes from './routes'
import store from './store'

const history = syncHistoryWithStore(createBrowserHistory(), store)

export default class extends Component {
    render() {
        return <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={ Routes.Main } />
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
        </Provider>
    }
}