import React, { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import video from './resources/milky-way.mp4'
import Photos from './components/Photos'
import Loader from './components/Loader'
import Pagination from './components/Pagination'
import './styles.css'

const App = () => {
	const [photos, setPhotos] = useState([])
	const [input, setInput] = useState('')
	const [searchTerm, setSearchTerm] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const inputFocus = useRef('')

	const [currentPage, setCurrentPage] = useState(1)
	const photosPerPage = useRef(20)
	const totalPhotos = useRef('')

	useEffect(() => {
		inputFocus.current.focus()
	}, [photos])

	const handleSearchInput = (event) => {
		setInput(event.target.value)
	}

	const handleFormSubmit = (event) => {
		event.preventDefault()

		const updateSearchTermAndInput = () => {
			setSearchTerm(input)
			setInput('')
		}

		if (input !== searchTerm && searchTerm !== '') {
			setCurrentPage(1)
			updateSearchTermAndInput()
		} else {
			updateSearchTermAndInput()
		}
	}

	useEffect(() => {
		const fetchPhotos = async () => {
			setIsLoading(true)

			const response = await axios.get('https://api.pexels.com/v1/search', {
				params: {
					query: searchTerm,
					page: currentPage,
					per_page: photosPerPage.current,
				},
				headers: {
					Authorization: process.env.REACT_APP_PEXELS_API_KEY,
				},
			})

			totalPhotos.current = response.data.total_results

			setPhotos(response.data.photos)
			setIsLoading(false)
		}

		if (searchTerm.length > 0) {
			fetchPhotos()
		}
	}, [searchTerm, currentPage])

	const renderPhotos = () => {
		if (isLoading) {
			return <Loader />
		}

		return (
			<>
				<Photos photos={photos} searchTerm={searchTerm} />

				{photos.length > 0 && (
					<Pagination
						currentPage={currentPage}
						totalPhotos={totalPhotos.current}
						handlePagination={handlePagination}
					/>
				)}
			</>
		)
	}

	const handlePagination = (number) => {
		setCurrentPage(number)
	}

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
												value={input}
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

				{renderPhotos()}
			</div>

			<video id="background-video" playsInline muted loop autoPlay>
				<source src={video} type="video/mp4" />
			</video>
		</>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
