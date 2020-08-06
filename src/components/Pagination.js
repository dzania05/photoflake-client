import React from 'react'

const Pagination = ({ image, handlePaginate, paginate, curpage }) => {
	return (
		<div className="pagination-wrapper">
			<nav aria-label="Page navigation example">
			  	<ul className="pagination">
					{ image && [...Array(paginate).keys()].map(item => (
				    	<li key={item} 
				    		onClick={(e) => handlePaginate(e, item + 1)} 
				    		className={((item + 1) === curpage) ? 'page-item active' : 'page-item'} >
				    		<a className="page-link" href="#">{item + 1}</a>
				    	</li>
					))}
				    
			  	</ul>
			</nav>
		</div>
	)
}

export default Pagination