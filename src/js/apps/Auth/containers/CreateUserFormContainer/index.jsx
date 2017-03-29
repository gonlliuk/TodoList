import React, { Component } from 'react'
import AuthProvider from 'libs/auth'

import CreateUserForm from 'components/CreateUserForm'

export default class extends Component {
    constructor(props) {
        super(props)
        this.Auth = new AuthProvider()
    }

    createUser(credentials) {
        return this.Auth.createUser(credentials)
            .then(user => {
                window.location.href = '/'
            })
    }

    render() {
        return <CreateUserForm createUser={::this.createUser}/>
    }
}
