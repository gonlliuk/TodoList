import AuthProvider from 'libs/auth'
import * as actions from '../actions/auth'

const auth = new AuthProvider()

export function signOut() {
	return async (dispatch) => {
		await auth.signOut()
		dispatch(actions.signOut())
	}
}
