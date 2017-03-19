import React, { Component } from 'react'

import './index.styl'

export default class extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { name, type, onClickHandler, className, isDisabled } = this.props
		return <button 
			type={type} 
            className={`button button--${className} ${ isDisabled ? 'button--disabled' : '' }`}
            disabled={isDisabled}
            onClick={onClickHandler}>
            {name}
        </button>
	}
}