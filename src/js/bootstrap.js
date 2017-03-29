import 'babel-polyfill'
import firebase from 'firebase'
import AuthProvider from 'libs/auth'
import DatabaseProvider from 'libs/database'
import dbConfig from './firebaseConfig'

import 'stylus/main.styl'

firebase.initializeApp(dbConfig)

const Auth = new AuthProvider()
const Database = new DatabaseProvider()

const getInfo = async function(){
    try {
        const user = await Auth.getUser()
        const data = await Database.getTodoListByUserId(user.id)
        System.import('apps/App')
            .then(App => App.default({user, data}))
    } catch (e) {
        System.import('apps/Auth')
            .then(App => App.default(e))
    }
}

getInfo()
