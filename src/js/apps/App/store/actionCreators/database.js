import firebase from 'firebase'
import Database from 'libs/database'
import * as actions from '../constants'

const db = new Database()

export function getTodoList(userId) {
	return async (dispatch) => {
		const data  = await db.getTodoListByUserId(userId)
		dispatch({
			type: actions.getTodoList,
			payload: data
		})
	}
}

export function addTodo(payload) {
	return async (dispatch) => {
		const { todo } = await db.addTodo(payload)
		dispatch({
			type: actions.addTodo,
			payload: todo
		})
	}
}

export function removeTodo(payload) {
	return async (dispatch) => {
		const { todo } = await db.removeTodo(payload)
		dispatch({
			type: actions.removeTodo,
			payload: todo
		})
	}
}

export function updateTodo(payload) {
	return async (dispatch) => {
		const { todo } = await db.updateTodo(payload)
		dispatch({
			type: actions.updateTodo,
			payload: todo
		})
	}
}