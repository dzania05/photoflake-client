import axios from 'axios'

const root = 'https://photoflake.herokuapp.com/api/search'
const GET = (params) => {
	const promise = new Promise((resolve, reject) => {
		axios.get(`${root}?tags=${params}`)
		.then(result => resolve(result))
		.catch(err => reject(err))
	})

	return promise
}

const getImage = (keyword) => GET(keyword)

const API = { getImage }

export default API