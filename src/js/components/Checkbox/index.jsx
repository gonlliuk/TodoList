import React, { Component } from 'react'

import './index.styl'

export default class extends Component {
	constructor(props) {
		super(props);
	}

	getClass() {
		return this.props.state ? 'checkbox--checked' : 'checkbox--unchecked'
	}

	render() {
		const { onClickHandler, state } = this.props
		return <div className={`checkbox__chec ${::this.getClass()}`} onClick={onClickHandler}>
			{
				state 
					? <span className="fa fa-check checkbox__check"></span>
					: null
			}
		</div>
	}
}