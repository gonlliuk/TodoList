import React, { Component } from 'react'
import moment from 'moment'

import './index.styl'

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			input: '',
			disabled: false,
			error: false
		}
	}

	inputChangeHandler(e) {
		this.setState({ input: e.target.value })
	}

	inputKeyupHandler(e) {
		if (e.keyCode === 13) this.clickButtonHandler(e)
	}

	async clickButtonHandler(e) {
		const { 
			state: { input, disabled }, 
			props: { addItem, user }
		} = this

		if (input.trim() === '') return

		try {
			this.setState({ disabled: true, error: false })
			await addItem({
	            userId: user.id,
	            todo: {title: input, date: moment().format()}
	        })
	        this.setState({ disabled: false, input: '' })
		}
		catch(e) {
			setState({ disabled: false, error: true })
		}
	}

	render() {
		const { disabled, input } = this.state
		return <div className="add-item">
			<div className="add-item__input">
				<input
					type="text"
					name="input"
					className="input"
					value={input}
					maxlength="140"
					onChange={::this.inputChangeHandler}
					onKeyUp={::this.inputKeyupHandler}
					placeholder="write task title here"
					disabled={disabled}/>
			</div>
			<div className="add-item__button">
				<button 
					type="button"
					className="button button--blue"
					onClick={::this.clickButtonHandler}
					disabled={disabled}>
					Add
				</button>
			</div>
		</div>
	}
}