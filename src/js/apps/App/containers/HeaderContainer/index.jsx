import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signOut } from '../../store/actionCreators/auth'

import Header from 'components/Header'

@connect(
    ({ user }) => ({ user }),
    (dispatch) => bindActionCreators({ signOut }, dispatch)
)

export default class extends Component {

    signOut() {
        this.props.signOut()
            .then(() => window.location.href = '/')
    }
    render() {
        const { user } = this.props
        return <Header user={user} logout={::this.signOut}/>
    }
}
