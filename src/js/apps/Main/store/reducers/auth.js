import * as actions from '../constants' 

export default function(state = {}, action) {
	switch (action.type) {
		case actions.signIn:
			return action.payload
		case actions.signOut:
			return {}
		default:
			return state
	}		
}