import * as actions from '../constants'

export function signIn(user) {
	return {
		type: actions.signIn,
		payload: user
	}
}

export function signOut() {
	return {
		type: actions.signOut
	}
}
