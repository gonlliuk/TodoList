import React, { Component } from 'react'

import Button from 'components/Button'
import Input from 'components/Input'

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

        this.errorText = 'Unfortunately, your e-mail or password is incorrect. Please try again.'

        this.button = {
            type: 'submit',
            name: 'Login'
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
        const _this = this
        const { email, password, error } = this.state
        this.setState({ disabled : true, error: false })
        this.props.login({ email, password})
            .catch(error => {
                this.setState({
                    disabled: false,
                    error: true
                })
            })
    }

    isInvalidFields() {
        const { email, password } = this.state
        const emailValidator = /^\s*[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+\.[a-zA-Z]{2,4}\s*$/g
        return !(emailValidator.test(email) && password.length >= 8)
    }

    getDisabledClass() {
        return this.isInvalidFields()
            ? 'auth-form__button-submit--disabled'
            : ''
    }

    getErrorDiv() {
        const { error } = this.state
        return error 
            ? (<div className="auth-form__error">
                    { this.errorText }
                </div>)
            : null
    }

    mapInputs() {
        const { disabled } = this.state
        return this.inputs.map((input, i) => {
            return <div key={i} className="auth-form__input">
                <Input
                    type={input.type}
                    onChangeHandler={::this.inputChangeHandler}
                    isDisabled={disabled}
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
                <span>Please enter your e-mail and password below to login</span>
            </div>
            <form action={::this.submitHandler}>
                <div className="auth-form__credentials">
                    { ::this.mapInputs() }
                </div>
                { ::this.getErrorDiv() }
                <div className="auth-form__form-submit">
                    <Button 
                        type={this.button.type} 
                        onClickHandler={::this.submitHandler}
                        isDisabled={::this.isInvalidFields() || disabled}
                        name={this.button.name}/>
                </div>
            </form>
        </div>
    }
}