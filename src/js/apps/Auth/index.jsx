import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, Redirect, Switch } from 'react-router'
import { createBrowserHistory }  from 'history'
import * as Routes from './routes'

const history = createBrowserHistory()

ReactDom.render(
	<Router history={history}>
		<div>
		<Switch>
			<Route path="/login" component={ Routes.Login } />
			<Route path="/create_user" component={ Routes.CreateUser } />
			<Redirect from="*" to="/login"></Redirect>
		</Switch>
		</div>
	</Router>,
	document.getElementById('app')
)

export default function onSuccess(error) {
    console.log(error)
}
