import React, { useState, useContext , useEffect} from 'react'
import Pagination from './Pagination'
import { StoreContext } from '../libs/store'
import Spinner from '../spinner.svg'
import NotFound from '../not_found.jpg'

const Grid = () => {
	const [ state, dispatch ] = useContext(StoreContext)
	const [ image, setImage ] = useState()
	const [ indexes, setIndexes ] = useState(0)
	const [ count, setCount ] = useState(16)
	const [ curpage, setCurpage ] = useState(1)
	const [ loaded, setLoaded ] = useState(false)

	const perpage = image && image.perpage
	const paginate = Math.ceil(perpage / 16)

	useEffect(() => {
		setImage(state.image.photos)
		setCount(16)
		setIndexes(0)
		setCurpage(1)
		setLoaded(false)
	}, [state])

	const handlePaginate = (e, item) => {
		e.preventDefault()
		setCount(16 * item)
		setIndexes((16 * item) - 16)
		setCurpage(item)
		setLoaded(false)
	}

	const handleLoadImage = () => {
		setLoaded(true)
	}

	return (
		<React.Fragment>
			<div className="grid-wrapper">
				<div className="row">
					{ image && image.photo.slice(indexes, count).map(item => (
						<div className="col-md-3" key={item.id}>
							<a href={`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_c.jpg`} target="_blank">
								<div className="grid-image-wrapper">
									{ !loaded && <img className="img-placeholder" src={Spinner} /> }
									<div className="img-overlay">
										{item.title}
									</div>
									<img src={`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} 
										style={!loaded ? {'display': 'none'} : {}} 
										onLoad={handleLoadImage} 
										onError={(e) => e.target.src = NotFound }
										/>
								</div>
							</a>
						</div>
					))}
				</div>
			</div>
			<Pagination image={image} paginate={paginate} curpage={curpage} handlePaginate={handlePaginate} />
		</React.Fragment>
	)
}

export default Grid