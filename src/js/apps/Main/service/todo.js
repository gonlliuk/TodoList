const Service = function() {
	const _this = _this

	this.updateTodo = (list, todo) => {
		if (!list || !todo) return []

		const newList = list.filter(item => item.id !== action.payload.id)
		let editTodo = list.find(item => item.id === action.payload.id)
		editTodo = {...editTodo, ...todo}
		return [...newList, editTodo]
	}

	this.toArray = (obj) => {
		const list = []
		for (let key in obj) {
			list.push(obj[key])
		}

		return list
	}
}

export default Service
