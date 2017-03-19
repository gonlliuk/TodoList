import firebase from 'firebase'

class Auth {
	constructor() {
		this.db = firebase.auth()
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
			this.db.onAuthStateChanged(user => {
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
		const user = await this.db.createUserWithEmailAndPassword(credentials.email, credentials.password)
		return this.setUser(user)
	}

	async signIn(credentials = {}) {
		const user = await this.db.signInWithEmailAndPassword(credentials.email, credentials.password)
		return this.setUser(user)
	}

	async signOut() {
		await this.db.signOut()
		return this.setUser()
	}


}

export default Auth
