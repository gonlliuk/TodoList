import * as actions from '../constants'
import TodoService from '../../service/todo'

export default function(state = [], action) {
    const service = new TodoService()
    switch (action.type) {
        case actions.getTodoList:
            return service.toArray(action.payload)
        case actions.addTodo:
            return [...state, action.payload]
        case actions.updateTodo:
            return service.updateTodo(state, action.payload)
        case actions.removeTodo:
            return state.filter(item => item.id !== action.payload.id)
        default:
            return state
    }        
}
