import React, { Component } from 'react'
import AuthProvider from 'libs/auth'

import AuthForm from 'components/AuthForm'

export default class extends Component {
	constructor(props) {
		super(props);
		this.Auth = new AuthProvider()
	}

	login(credentials) {
		return this.Auth.signIn(credentials)
			.then(user => {
				window.location.href = '/'
			})
	}

	render() {
		return <AuthForm login={::this.login}/>
	}
}
