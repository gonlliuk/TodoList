import 'babel-polyfill';
import firebase from 'firebase';
import AuthProvider from 'libs/auth';
import dbConfig from './firebaseConfig'

firebase.initializeApp(dbConfig)

const Auth = new AuthProvider()

Auth.getUser()
	.then(user => {
		System.import('apps/Main')
			.then(App => App.default(user))
	}, error => {
		System.import('apps/Login')
			.then(App => App.default(error))
	})