import React, { Component } from 'react'
import moment from 'moment'
import Input from 'components/Input'
import Button from 'components/Button'

import './index.styl'

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: '',
			isDisabled: false,
			error: false
		}
		this.button = {
			type: 'button',
			name: 'Add',
			className: 'blue'
		}
		this.input = {
			type: 'text',
			name: 'inputValue',
			placeholder: 'what do you want to do today?'
		}

	}

	inputChangeHandler(value, prop) {
		this.setState({ [prop]: value })
	}

	async clickButtonHandler() {
		const { 
			state: { inputValue, isDisabled }, 
			props: { addItem, user }
		} = this

		if (inputValue.trim() === '') return

		try {
			this.setState({ isDisabled: true, error: false })
			await addItem({
	            userId: user.id,
	            todo: {title: inputValue, date: moment().format()}
	        })
	        this.setState({ isDisabled: false, inputValue: '' })
		}
		catch(e) {
			setState({ isDisabled: false, error: true })
		}
	}

	render() {
		const { button, input, state: { isDisabled, inputValue } } = this
		return <div className="add-item">
			<div className="add-item__input">
				<Input
					type={input.type}
					name={input.name}
					value={inputValue}
					onChangeHandler={::this.inputChangeHandler}
					placeholder={input.placeholder}
					isDisabled={isDisabled}/>
			</div>
			<div className="add-item__button">
				<Button 
					type={button.type}
					name={button.name}
					className={button.className}
					onClickHandler={::this.clickButtonHandler}
					isDisabled={isDisabled}/>
			</div>
		</div>
	}
}