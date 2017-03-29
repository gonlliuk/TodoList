import React, { Component } from 'react'
import TodoItem from 'components/TodoItem'

import './index.styl'

export default class extends Component {
    getItems() {
        const { itemList, removeItem, editItem, user } = this.props
        return itemList.length
            ? itemList.map(item => {
                item.userId = user.id
                return <TodoItem 
                    key={item.id} 
                    item={item}
                    removeItem={removeItem} 
                    editItem={editItem} />
            })
            : <div className="todo-list__empty">
                There are no todos yet.<br/>
                You could add one in the form above
            </div>
    }

    render() {
        return <div className="todo-list">{ ::this.getItems() }</div>
    }
}
