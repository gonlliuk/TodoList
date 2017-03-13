import firebase from 'firebase'
import * as actions from '../constants'

export function getUser(token) {
	return function(dispatch) {
		return firebase.auth().signInWithCustomToken(token)
			.then(user => {
				console.log(user)
				dispatch(actions.signIn, user || {})
			})
			.catch(error => {
				console.error(error)
			})
	}
}

export function creteUser(credentials) {
	return function(dispatch) {
		return firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
			.then(user => {
				dispatch(actions.signIn, user || {})
			})
			.catch(error => {
				console.error(error)
			})
	}
}

export function signIn(credentials) {
	return function(dispatch) {
		return firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
			.then(user => {
				dispatch(actions.signIn, user)
			})
			.catch(error => {
				console.error(error)
			})
	}
}

export function signOut() {
	return function(dispatch) {
		firebase.auth().signOut()
			.then(() => {
				dispatch(actions.signOut)
				dispatch(actions.clearTodoList)
			})
			.catch(error => {
				console.error(error)
			})
	}
}
