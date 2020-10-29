import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import video from './resources/milky-way.mp4'
import './styles.css'

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

	const renderPhotos = () => {
		return photos.map((photo) => {
			return (
				<>
					<div className="col-md-4 mb-3">
						<picture className="thumbnail">
							<a href={photo.url} target="_blank" rel="noreferrer">
								<img
									src={photo.src.medium}
									className="img-fluid img-thumbnail"
									alt="Image"
									width="100%"
								/>
							</a>
						</picture>
					</div>
				</>
			)
		})
	}

	useEffect(() => {
		fetchPhotos()
	}, [])

	return (
		<>
			<div className="container">
				<header className="mb-5">
					<form className="w-50 mx-auto row">
						<div className="form-group mt-5 col-12">
							<h1 className="text-center text-white p-2 border-bottom border-light mb-4">
								Image Search
							</h1>
							<div className="row">
								<form className="form col-md-12">
									<div className="row">
										<div className="col-md-9">
											<input
												className="form-control mr-sm-2 mb-3 "
												type="search"
												placeholder="Enter item..."
												aria-label="Search"
											/>
										</div>
										<div className="col-md-3">
											<button
												className="form-control btn btn-outline-light mb-3 "
												type="submit"
											>
												<i className="fas fa-search"></i>
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</form>
				</header>

				<section className="row">{renderPhotos()}</section>
			</div>

			<video id="background-video" playsInline muted loop autoPlay>
				<source src={video} type="video/mp4" />
			</video>
		</>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
