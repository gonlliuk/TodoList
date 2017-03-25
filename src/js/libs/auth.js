import firebase from 'firebase'

class Auth {
	constructor() {
		this.auth = firebase.auth()
		this.db = firebase.database()
	}

	setUser(user = {}) {
		this.user = {
			photo: user.photoURL,
			email: user.email,
			name: user.displayName,
			id: user.uid,
			token: user.refreshToken,
		}

		return this.user
	}

	getUser() {
		return new Promise((resolve, reject) => {
			this.auth.onAuthStateChanged(user => {
				if (!user) {
					reject({
						status: 403,
						message: 'Forbidden'
					})
				} else {
					resolve(this.setUser(user))
				}
			})
		})
	}

	async createUser(credentials = {}) {
		let user = await this.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
		user = this.setUser(user)
		await this.db.ref(`/users/${user.id}/userInfo`).set(user)
		return user
	}

	async signIn(credentials = {}) {
		const user = await this.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
		return this.setUser(user)
	}

	async signOut() {
		await this.auth.signOut()
		return this.setUser()
	}


}

export default Auth
