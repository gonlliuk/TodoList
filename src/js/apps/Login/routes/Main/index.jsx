import React, { Component } from 'react'
import AuthProvider from 'libs/auth'

import './index.styl'

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: ''
		}

		this.Auth = new AuthProvider()
	}

	loginHandler(e) {
		e.preventDefault()
		this.Auth.signIn({
			email: this.state.email,
			password: this.state.password
		})
			.then(user => {
				console.log(user)
				window.location.href = '/'
			}, error => {
				console.error(error)
			})
	}

	emailChangeHandler(e) {
		this.setState({ email: e.target.value })
	}

	passwordChangeHandler(e) {
		this.setState({ password: e.target.value })
	}

	createHandler(e) {
		e.preventDefault()
		const { email, password } = this.state
		this.Auth.createUser({ email, password })
			.then(user => {
				console.log(user)
				window.location.href = '/'
			}, error => {
				console.error(error)
			})
	}
	isLoginButtonDisabled() {
		const { email, password } = this.state
		const emailValidator = /^\s*[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+\.[a-zA-Z]{2,4}\s*$/g
		return !(emailValidator.test(email) && password.length >= 8)
	}

	render() {
		const { email, password } = this.state
		return <form className="authForm">
			<div className="authForm__field">
				<input type="email" 
					value={email} 
					placeholder="Email"
					onChange={::this.emailChangeHandler}/>
			</div>
			<div className="authForm__field">
				<input type="password" 
					value={password} 
					placeholder="Passsword"
					onChange={::this.passwordChangeHandler}/>
			</div>
			<div className="authForm__field--center">
				<button type="submit" 
					disabled={::this.isLoginButtonDisabled()}
					onClick={::this.loginHandler}>Login</button>
				<span> or </span>
				<button type="submit"
					disabled={::this.isLoginButtonDisabled()}
					onClick={::this.createHandler}>Create User</button>
			</div>
		</form>
	}
}

export default Login
