import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Checkbox from 'components/Checkbox'

import './index.styl'

export default class extends Component {
    constructor(props) {
        super(props)
        this.state= {
            edit: false,
            disabled: false,
            title: this.props.item.title
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ title: nextProps.item.title})
    }

    getClass() {
        const { item: { done }} = this.props
        return done ? 'todo-item__title--checked' : ''
    }

    async changeItemStateHandler() {
        const { editItem, item } = this.props
        await editItem({ 
            userId: item.userId,
            todo: {
                id: item.id,
                done: !item.done,
                updatedAt: moment().format()
            }
        })
    }

    async editTitle() {
        const { editItem, item } = this.props
        let { title, disabled } = this.state
        const { oldTitle } = this
        title = title.trim()

        if (title === '' || title === oldTitle ) {
            this.setState({ edit: false, title: oldTitle })
            return 
        }
        
        try {
            this.setState({ disabled: true })
            await editItem({ 
                userId: item.userId,
                todo: {
                    id: item.id,
                    title,
                    updatedAt: moment().format()
                }
            })
            this.setState({ disabled: false, edit: false })
        }
        catch (e) {
            this.setState({ disabled: false })
        }
    }

    editTitleHandler() {
        this.oldTitle = this.state.title
        this.setState({ edit: true })
    }

    inputChangeHandler(e) {
        this.setState({ title: e.target.value })
    }

    inputKeyupHandler(e) {
        if (e.keyCode === 13) this.editTitle()
    }

    async removeHandler() {
        const { item, removeItem } = this.props
        await removeItem({ 
            userId: item.userId,
            todo: { id: item.id }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const { edit } = this.state
        if (edit) this.refs.input.focus()
    }

    render() {
        const { item: { done }, removeItem, editItem } = this.props
        const { edit, title, disabled } = this.state

        return <div className="todo-item">
            <Checkbox 
                onClickHandler={::this.changeItemStateHandler} 
                state={done} />
                {
                    edit
                        ? <input 
                            type="text"
                            ref="input"
                            value={title}
                            disabled={disabled}
                            onChange={::this.inputChangeHandler}
                            onBlur={::this.editTitle}
                            onKeyUp={::this.inputKeyupHandler}
                            className="todo-item__input input input--borderBottom"/>
                        : <div 
                            onClick={::this.editTitleHandler}
                            className={`todo-item__title ${::this.getClass()}`}>{ title }</div>
                }
            <div 
                className="fa fa-trash todo-item__remove"
                title="Remove"
                onClick={::this.removeHandler}></div>
        </div>
    }
}
