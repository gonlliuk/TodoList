import React, { Component } from 'react'
import { Router, Route, Redirect, Switch } from 'react-router'
import { createBrowserHistory }  from 'history'
import * as Routes from './routes'

const history = createBrowserHistory()

export default class extends Component {
    render() {
        return <Router history={history}>
            <Switch>
                <Route path="/login" component={ Routes.Login } />
                <Route path="/create_user" component={ Routes.CreateUser } />
                <Redirect from="*" to="/login"></Redirect>
            </Switch>
        </Router>
    }
}
