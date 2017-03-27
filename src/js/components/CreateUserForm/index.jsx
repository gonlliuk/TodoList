import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './index.styl'

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            error: false,
            disabled: false
        }
        this.errorMessages = {
            email: 'The email address is badly formated',
            strongPassword: 'Password should be at least 8 characters',
            samePasswords: 'The passwords you entered do not match',
        }

        this.inputs = [{
            name: 'email',
            type: 'text',
            placeholder: 'Email'
        }, {
            name: 'password',
            type: 'password',
            placeholder: 'Password'
        }, {
            name: 'confirmPassword',
            type: 'password',
            placeholder: 'Confirm password'
        }]
    }

    inputChangeHandler(val, prop) {
        this.setState({ [prop]: val })
    }

    isValidFields() {
        return this.isValidEmail() && this.isSamePasswords() && this.isStrongPassword()
    }

    submitHandler(e) {
        e.preventDefault()
        const { email, password, error } = this.state
        if (!this.isValidFields()) {
            this.setState({
                error: true,
                errorText: this.getErrorText()
            })
            return
        }

        this.setState({ disabled : true, error: false, errorText: '' })
        this.props.createUser({ email, password })
            .catch(error => {
                console.log(error)
                this.setState({
                    disabled: false,
                    error: true,
                    errorText: error.message
                })
            })
    }

    isEmptyFields() {
         const { email, password, confirmPassword } = this.state
         return ![
            email.length,
            password.length,
            confirmPassword.length
         ].every(item => !!item)
    }

    isValidEmail() {
        const { email } = this.state
        const emailValidator = /^\s*[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+\.[a-zA-Z]{2,4}\s*$/g
        return emailValidator.test(email)
    }

    isStrongPassword() {
        const { password } = this.state
        return password.length >= 8
    }

    isSamePasswords() {
        const { password, confirmPassword } = this.state
        return password === confirmPassword
    }

    getErrorText() {
        const { errorMessages } = this
        
        if (!this.isValidEmail()) return errorMessages.email
        else if (!this.isStrongPassword()) return errorMessages.strongPassword
        else if (!this.isSamePasswords()) return errorMessages.samePasswords
        else return 'Unkwon error occured'
    }

    mapInputs() {
        const { disabled } = this.state
        return this.inputs.map((input, i) => {
            return <div key={i} className="create-user-form__input">
                <input
                    type={input.type}
                    className="input"
                    onChange={(e) => ::this.inputChangeHandler(e.target.value, input.name)}
                    disabled={disabled}
                    name={input.name}
                    placeholder={input.placeholder}/>
            </div>
        })
    }

    render() {
        const { disabled, error, errorText } = this.state
        return <div className="create-user-form">
            <div className="create-user-form__header">
                <span>Create new account</span>
            </div>
            <div className="create-user-form__note">
                <span>
                    Please enter your e-mail and password below<br/>
                    or<br/>
                    <Link to="/login">Login to existing account</Link>
                </span>
            </div>
            <form action={::this.submitHandler}>
                <div className="create-user-form__credentials">
                    { ::this.mapInputs() }
                </div>
                <div className="create-user-form__error">
                    { error ? errorText : null }
                </div>
                <div className="create-user-form__form-submit">
                    <button 
                        type="submit"
                        className="button button--blue"
                        onClick={::this.submitHandler}
                        disabled={::this.isEmptyFields() || disabled}>
                        Create
                    </button>
                </div>
            </form>
        </div>
    }
}