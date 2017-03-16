import React, { Component } from 'react'

import './index.styl'

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value || ''
		}
	}

	changeHandler(e) {
		e.preventDefault();
		const value = e.target.value
		this.props.onChangeHandler(value, this.props.name)
		this.setState({ value })
	}

	render() {
		const { value } = this.state
		const { type, name, placeholder, isDisabled } = this.props
		return <input 
			type={type} 
			value={value}
            onChange={::this.changeHandler}
            disabled={isDisabled}
            className="input"
            placeholder={placeholder}/>
	}
}