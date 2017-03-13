import firebase from 'firebase'

class Auth {
	constructor() {
		this.db = firebase
	}

	setUser(user = {}) {
		this.user = {
			photo: user.photoURL,
			email: user.email,
			name: user.displayName,
			id: user.uid,
			token: user.refreshToken,
		}
	}

	getUser() {
		return new Promise((resolve, reject) => {
			this.db.auth().onAuthStateChanged(user => {
				if (!user) {
					reject({ status: 403 })
				} else {
					this.setUser(user)
					resolve(this.user)
				}
			})
		})
	}

	getUserWithToken(token = '') {
		return new Promise((resolve, reject) => {
			this.db.auth().signInWithCustomToken(token)
				.then(user => {
					console.log(user)
					this.setUser(user)
					resolve(this.user)
				})
				.catch(error => {
					reject(error)
				})
		})
	}

	createUser(credentials = {}, redirect = '/') {
		return new Promise((resolve, reject) => {
			this.db.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
				.then(user => {
					this.setUser(user)
					resolve(this.user)
				})
				.catch(error => {
					reject(error)
				})
		})
	}

	signIn(credentials = {}, redirect = '/') {
		return new Promise((resolve, reject) => {
			this.db.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
				.then(user => {
					this.setUser(user)
					resolve(this.user)
				})
				.catch(error => {
					reject(error)
				})
		})
	}

	signOut() {
		return new Promise((resole, reject) => {
			this.db.auth().signOut()
				.then(() => {
					this.setUser()
					resolve(this.user)
				})
				.catch(error => {
					reject(error)
				})
		})
	}
}

export default Auth
