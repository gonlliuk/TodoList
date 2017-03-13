import firebase from 'firebase'
import * as actions from '../constants'

export function getTodoList(userId) {
	return function(dispatch) {
		return firebase.database().ref(`/users/${userId}/todoList`).on('value', snap => {
			dispatch({
				type: actions.getTodoList,
				payload: snap.val() || []
			})
		})
	}
}

export function addTodo(payload) {
	return function(dispatch) {
		const newKey = firebase.database().ref(`/users/${payload.userId}/`).child('todoList').push().key
		payload.todo.id = newKey
		return firebase.database().ref(`/users/${payload.userId}/`).update({[`/todoList/${newKey}`]: payload.todo})
	}
}

export function removeTodo(payload) {
	return function(dispatch) {
		return firebase.database().ref(`/users/${payload.userId}/`).update({[`/todoList/${payload.todo.id}`]: null})
	}
}

export function updateTodo(payload) {
	return function(dispatch) {
		return firebase.database().ref(`/users/${payload.userId}/`).update({[`/todoList/${payload.todo.id}`]: payload.todo})
	}
}