import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const App = () => {
	const [photos, setPhotos] = useState([])

	const fetchPhotos = async () => {
		const response = await axios.get('https://api.pexels.com/v1/search', {
			params: {
				query: 'cats',
			},
			headers: {
				Authorization: process.env.REACT_APP_PEXELS_API_KEY,
			},
		})
		setPhotos(response.data.photos)
	}

	useEffect(() => {
		fetchPhotos()
	}, [])

	return <div>Image search app</div>
}

ReactDOM.render(<App />, document.getElementById('root'))
