import React, { useState, useEffect, useContext } from 'react'
import API from '../libs/api'
import { StoreContext } from '../libs/store'
import Logo from '../app_logo.png'

const SearchBar = () => {
	const [ keyword, setKeyword ] = useState('')
	const [ state, dispatch ] = useContext(StoreContext)
	const [ focus, setFocus ] = useState(false)

	const handleSubmit = () => {
		if(keyword === ''){
			return
		}

		setFocus(false)
		dispatch({type: 'STORE_RECENT', item: keyword})
		API.getImage(keyword)
		.then(result => dispatch({type: 'STORE_IMAGE', image: result.data.data}))
		.catch(err => console.log(err.message))
	}

	const handleClickRecent = (item) => {
		if(item === keyword) {
			return
		}
		
		setKeyword(item)
		handleSubmit()
	}

	return (
		<div className="search-wrapper">
			<img src={Logo} />
			<div className="input-group">
	    		<input type="text" className="form-control" 
	    			placeholder="Enter keyword to search..." 
	    			onChange={(e) => setKeyword(e.target.value)} 
	    			value={keyword}
	    			onFocus={() => setFocus(true)}
	    			onBlur={() => setTimeout(() => setFocus(false) , 150)}
	    			onKeyPress={(e) => {
	    				if(e.key === 'Enter'){
	    					handleSubmit()
	    				}
	    			}} 
	    			/>
	    		<div className="input-group-append">
				    <button className="btn btn-success" type="button" onClick={handleSubmit}>OK</button>
				 </div>
	  		</div>
	  		{ (state.recent.length > 0) &&
	    		<div className="recent-search" style={!focus ? {'display' : 'none'} : {'display' : 'block'}}>
	    			{ state && state.recent.map((item, index) => (
	    				<div className="recent-item" key={index} onClick={() => handleClickRecent(item)}>{item}</div>
	    			))}
	    		</div>
	  		}
  		</div>
	)
}

export default SearchBar