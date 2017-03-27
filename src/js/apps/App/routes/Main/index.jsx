import React, { Component } from 'react'
import TodoListContainer from '../../containers/TodoListContainer'
import HeaderContainer from '../../containers/HeaderContainer'

export default class extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return <div>
			<HeaderContainer />
			<TodoListContainer />
		</div>
	}
}
