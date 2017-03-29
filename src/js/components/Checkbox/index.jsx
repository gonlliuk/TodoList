import React, { Component } from 'react'
import './index.styl'

export default class extends Component {
    getClass() {
        return this.props.state ? 'checkbox--checked' : 'checkbox--unchecked'
    }

    render() {
        const { onClickHandler, state } = this.props
        return <div 
            className={`checkbox ${::this.getClass()}`} 
            title={ state ? 'Check as undone' : 'Check is done'}
            onClick={onClickHandler}>
            { state
                ? <span className="fa fa-check checkbox__check"/>
                : null
            }
        </div>
    }
}
