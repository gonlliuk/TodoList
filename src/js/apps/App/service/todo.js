const Service = function() {
	const _this = _this

	this.updateTodo = (list, todo) => {
		if (!list || !todo) return []

		let index = list.findIndex(item => item.id === todo.id)
		list[index] = { ...list[index], ...todo }
		return [...list]
	}

	this.toArray = (obj) => {
		return Object.values(obj)
	}
}

export default Service
