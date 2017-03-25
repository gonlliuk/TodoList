import React, { Component } from 'react'

import './index.styl'

export default class extends Component {
	constructor(props) {
		super(props);
	}

	changeHandler(e) {
		e.preventDefault();
		const value = e.target.value
		this.props.onChangeHandler(value, this.props.name)
	}

	render() {
		const { type, name, placeholder, isDisabled, value } = this.props
		return <input 
			type={type} 
			value={value}
            onChange={::this.changeHandler}
            disabled={isDisabled}
            className="input"
            placeholder={placeholder}/>
	}
}