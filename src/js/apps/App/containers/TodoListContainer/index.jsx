import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as databaseActions from '../../store/actionCreators/database'

import TodoList from 'components/TodoList'
import AddItem from 'components/AddItem'

@connect(
    ({ todoList, user }) => ({ todoList, user }),
    (dispatch) => bindActionCreators(databaseActions, dispatch)
)

export default class extends Component {
    render() {
        const { todoList, user, addTodo, updateTodo, removeTodo } = this.props
        return <div>
            <AddItem addItem={addTodo} user={user}/>
            <TodoList 
                editItem={updateTodo} 
                removeItem={removeTodo} 
                itemList={todoList} 
                user={user}/>
        </div>
    }
}
