import React from 'react'

const Pagination = ({ currentPage, totalPhotos, handlePagination }) => {
	const pageNumbers = []
	const paginationLimit = 10

	const renderPagination = () => {
		if (totalPhotos > paginationLimit) {
			for (let i = 1; i <= paginationLimit; i++) {
				pageNumbers.push(i)
			}
		} else {
			for (let i = 1; i <= totalPhotos; i++) {
				pageNumbers.push(i)
			}
		}
	}

	renderPagination()

	return (
		<footer className="mb-5">
			<ul className="pagination pagination-sm justify-content-center border-0">
				{pageNumbers.map((number) => {
					let pageClass = 'page-item '
					if (number === currentPage) {
						pageClass += 'active'
					}

					return (
						<li
							key={number}
							onClick={(event) => handlePagination(event, number)}
							className={pageClass}
						>
							<a href="/" className="page-link">
								{number}
							</a>
						</li>
					)
				})}
			</ul>
		</footer>
	)
}

export default Pagination
