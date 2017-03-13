import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, Redirect } from 'react-router'
import { createBrowserHistory }  from 'history'
import * as Routes from './routes'

const history = createBrowserHistory()

ReactDom.render(
	<Router history={history}>
		<div>
			<Route path="/" component={ Routes.Main } />
			<Redirect from="*" to="/" />
		</div>
	</Router>,
	document.getElementById('app')
)

export default function onSuccess(error) {
    console.log(error)
}
