import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as database from '../../store/actionCreators/database'
import moment from 'moment'

@connect(
	state => ({
		user: state.user,
		todoList: state.todoList
	}),
	dispatch => bindActionCreators(database, dispatch)
)

class Main extends Component {
	constructor(props) {
		super(props)
		this.state = {
			newTodo: ''
		}
	}

	mapTodoList() {
		return this.props.todoList.map(item => {
			return <li key={item.id}>{item.title}</li>
		})
	}

	clearInput() {
		this.setState({newTodo: ''})
	}

	addTodoClickHandler() {
		const { newTodo } = this.state
		
		if (newTodo.trim() === '') {
           	this.clearInput()
            return
        }

        this.props.addTodo({
            userId: this.props.user.id,
            todo: {
				title: newTodo,
				date: moment().format('YYYY-MM-DDTHH:mm:ss')
			}
        })
        	.then(() => {
        		this.clearInput()
        	})
	}

	inputChangeHandler(e) {
		this.setState({ newTodo: e.target.value })
	}

	isAddDisabled() {
		const { newTodo } = this.state
		return newTodo.length < 1
	}

	render() {
		const state = this.state
		return <div className="todoList">
			<input type="numder" value={state.newTodo} onChange={::this.inputChangeHandler}/>
			<button 
				disabled={::this.isAddDisabled()}
				onClick={::this.addTodoClickHandler}>Add</button>
			<ul>{::this.mapTodoList()}</ul>
		</div>
	}
}

export default Main
