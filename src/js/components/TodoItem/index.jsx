import React, { Component } from 'react'
import Checkbox from 'components/Checkbox'

import './index.styl'

export default class extends Component {
	constructor(props) {
		super(props);
	}

	getClass() {
		const { item: { done }} = this.props
		return done ? 'todo-item__title--checked' : ''
	}

	async changeItemStateHandler() {
		const { editItem, item } = this.props
		await editItem({ 
			userId: item.userId,
			todo: {
				id: item.id,
				done: !item.done
			}
		})
	}

	async changeItemTitleHandler() {
		const { editItem, item } = this.props

		// TODO: get new item title 
		await editItem({ 
			userId: item.userId,
			todo: {
				id: item.id,
				title: item.title
			}
		})
	}

	async removeHandler() {
		const { item, removeItem } = this.props
		await removeItem({ 
			userId: item.userId,
			todo: { id: item.id }
		})
	}

	render() {
		const { item: { title, done }, removeItem, editItem } = this.props
		return <div className="todo-item">
			<Checkbox 
				onClickHandler={::this.changeItemStateHandler} 
				state={done} />
			<div className={`todo-item__title ${::this.getClass()}`}>{ title }</div>
			<div 
				className="fa fa-trash todo-item__remove"
				title="Remove"
				onClick={::this.removeHandler}></div>
		</div>
	}
}