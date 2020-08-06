import React, { createContext, useReducer } from 'react'

const initState = {
	image : {},
	recent: []
}

const reducer = (state, action) => {
	switch(action.type){
		case 'STORE_IMAGE':
			return {
				...state,
				image: action.image
			}
		case 'STORE_RECENT' :
			let recents

			if(state.recent.includes(action.item)){
				recents = state.recent
			} else {
				recents = [...state.recent, action.item]
			}

			return {
				...state,
				recent: recents
			}
		default:
			return state
	}
}

const StoreContext = createContext(initState)

const StoreProvider = ({ children }) => {
	const [ state, dispatch ] = useReducer(reducer, initState)

	return (
		<StoreContext.Provider value={[ state, dispatch ]}>
			{ children }
		</StoreContext.Provider>
	)
}

export { StoreContext, StoreProvider }