const api = {
	backendUrl: 'http://localhost:3000'
	methods: {
		sign: {
			in: {
				url: '/sign/in',
				method: 'post'
			},
			up: {
				url: '/sign/up',
				method: 'post'
			},
			out: {
				url: '/sign/out',
				method: 'post'
			}
		},
		todos: {
			get: {
				url: '/todos'
				method: 'get'
			}
		},
		todo: {
			add: {
				url: '/todos',
				method: 'put'
			},
			update: {
				url: '/todos/',
				method: 'patch'
			},
			delete: {
				url: '/todos/',
				method: 'put'
			}
		}
	}
}

export default api
