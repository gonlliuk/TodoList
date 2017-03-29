import firebase from 'firebase'

class Database {
    constructor() {
        this.db = firebase.database()
    }

    setTodoList(value = {}) {
        this.todoList = Object.values(value)
    }

    async getTodoListByUserId(userId) {
        const snap = await this.db.ref(`/users/${userId}/todoList`).once('value')
        const value = snap.val() || {}
        this.setTodoList(value)
        return this.todoList
    }

    async addTodo(data) {
        const newKey = this.db.ref(`/users/${data.userId}/todoList`).push().key
        data.todo.id = newKey
        await this.db.ref(`/users/${data.userId}/todoList/${newKey}`).set(data.todo)
        return data.todo
    }

    async updateTodo(data) {
        await this.db.ref(`/users/${data.userId}/todoList/${data.todo.id}`).update(data.todo)
        return data.todo
    }

    async removeTodo(data) {
        await this.db.ref(`/users/${data.userId}/todoList/${data.todo.id}`).remove()
        return data.todo
    }
}

export default Database
