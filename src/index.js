import React, { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import video from './resources/milky-way.mp4'
import './styles.css'

const App = () => {
	const [photos, setPhotos] = useState([])
	const [searchTerm, setSearchTerm] = useState('')
	const imageAlt = useRef('')
	const inputFocus = useRef('')

	const handleSearchInput = (event) => {
		setSearchTerm(event.target.value)
	}

	const handleFormSubmit = (event) => {
		event.preventDefault()

		fetchPhotos()
		imageAlt.current = searchTerm
		setSearchTerm('')
	}

	const fetchPhotos = async () => {
		const response = await axios.get('https://api.pexels.com/v1/search', {
			params: {
				query: { searchTerm },
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
				<div key={photo.id} className="col-md-4 mb-3">
					<picture className="thumbnail">
						<a href={photo.url} target="_blank" rel="noreferrer">
							<img
								src={photo.src.medium}
								className="img-fluid img-thumbnail"
								alt={`${imageAlt.current} image`}
								width="100%"
							/>
						</a>
					</picture>
				</div>
			)
		})
	}

	useEffect(() => {
		inputFocus.current.focus()
	}, [searchTerm])

	return (
		<>
			<div className="container">
				<header className="mb-5">
					<div className="w-50 mx-auto row">
						<div className="form-group mt-5 col-12">
							<h1 className="text-center text-white p-2 border-bottom border-light mb-4">
								Image Search
							</h1>
							<div className="row">
								<form className="form col-md-12" onSubmit={handleFormSubmit}>
									<div className="row">
										<div className="col-md-9">
											<input
												className="form-control mr-sm-2 mb-3 "
												type="search"
												placeholder="Enter item..."
												aria-label="Search"
												onChange={handleSearchInput}
												value={searchTerm}
												ref={inputFocus}
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
					</div>
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
