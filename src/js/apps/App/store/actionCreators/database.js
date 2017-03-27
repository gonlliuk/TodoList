import Database from 'libs/database'
import * as actions from '../actions/database'

const db = new Database()

export function getTodoList(userId) {
	return async (dispatch) => {
		const data  = await db.getTodoListByUserId(userId)
		dispatch(actions.getTodoList(data))
	}
}

export function addTodo(payload) {
	return async (dispatch) => {
		const todo = await db.addTodo(payload)
		dispatch(actions.addTodo(todo))
	}
}

export function removeTodo(payload) {
	return async (dispatch) => {
		const todo = await db.removeTodo(payload)
		dispatch(actions.removeTodo(todo))
	}
}

export function updateTodo(payload) {
	return async (dispatch) => {
		const todo = await db.updateTodo(payload)
		dispatch(actions.updateTodo(todo))
	}
}