const firebaseConfig = {
    apiKey: process.env.GOOGLE_KEY || '',
    messagingSenderId: process.env.GOOGLE_SENDER || '',
    authDomain: 'planner-faf0d.firebaseapp.com',
    databaseURL: 'https://planner-faf0d.firebaseio.com',
    storageBucket: 'planner-faf0d.appspot.com',
}

export default firebaseConfig
