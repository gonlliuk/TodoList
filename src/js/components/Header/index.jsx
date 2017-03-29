import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Checkbox from 'components/Checkbox'

import './index.styl'

export default class extends Component {
    render() {
        const { user, logout } = this.props
        return <div className="header">
            <div className="header__user">{ user.email }</div>
            <button 
                className="button button--grey"
                onClick={logout}>Logout</button>
        </div>
    }
}
