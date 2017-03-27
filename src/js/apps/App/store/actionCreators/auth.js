import AuthProvider from 'libs/auth'
import { signOut } from '../actions/auth'

const auth = new AuthProvider()

export function signOut() {
	return async (dispatch) => {
		await auth.signOut()
		dispatch(signOut())
	}
}
