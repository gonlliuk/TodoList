import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './index.styl'

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            error: false,
            disabled: false
        }

        this.inputs = [{
            name: 'email',
            type: 'text',
            placeholder: 'Email'
        }, {
            name: 'password',
            type: 'password',
            placeholder: 'Password'
        }]
    }

    inputChangeHandler(val, prop) {
        this.setState({ [prop]: val })
    }

    submitHandler(e) {
        e.preventDefault()
        const { email, password, error } = this.state
        this.setState({ disabled : true, error: false })
        this.props.login({ email, password})
            .then(user => {
                this.setState({
                    disabled: false
                })
            })
            .catch(error => {
                this.setState({
                    disabled: false,
                    error: true
                })
            })
    }

    isInvalidFields() {
        const { email, password } = this.state
        return !(email.length && password.length)
    }

    getDisabledClass() {
        return this.isInvalidFields()
            ? 'auth-form__button-submit--disabled'
            : ''
    }

    getErrorText() {
        const { error } = this.state
        return error 
            ? (<span>Unfortunately, your e-mail or password is incorrect.<br/>
                Please try again.</span>)
            : null
    }

    mapInputs() {
        const { disabled } = this.state
        return this.inputs.map((input, i) => {
            return <div key={i} className="auth-form__input">
                <input
                    className="input"
                    type={input.type}
                    onChange={(e) => ::this.inputChangeHandler(e.target.value, input.name)}
                    disabled={disabled}
                    name={input.name}
                    placeholder={input.placeholder}/>
            </div>
        })
    }

    render() {
        const { disabled } = this.state
        return <div className="auth-form">
            <div className="auth-form__header">
                <span>Welcome</span>
            </div>
            <div className="auth-form__note">
                <span>
                    Please enter your e-mail and password below<br/>
                    or<br/>
                    <Link to="/create_user">Create new account</Link>
                </span>
            </div>
            <form action={::this.submitHandler}>
                <div className="auth-form__credentials">
                    { ::this.mapInputs() }
                </div>
                <div className="auth-form__error">
                    { ::this.getErrorText() }
                </div>
                <div className="auth-form__form-submit">
                    <button 
                        type="submit"
                        className="button button--blue"
                        onClick={::this.submitHandler}
                        disabled={::this.isInvalidFields() || disabled}>
                        Login
                    </button>
                </div>
            </form>
        </div>
    }
}
