import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, Redirect } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { createBrowserHistory }  from 'history'
import * as Routes from './routes'
import store from './store'
import * as actions from './store/constants'

const history = syncHistoryWithStore(createBrowserHistory(), store)

ReactDom.render(
	<Provider store={store}>
		<Router history={history}>
			<div>
				<Route path="/" component={ Routes.Main } />
				<Redirect from="*" to="/" />
			</div>
		</Router>
	</Provider>,
	document.getElementById('app')
)

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
