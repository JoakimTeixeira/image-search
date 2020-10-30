import React from 'react'

const Header = ({
	handleFormSubmit,
	handleSearchInput,
	input,
	inputFocus,
	renderPhotos,
}) => {
	return (
		<header>
			<div className="container">
				<div className="w-50 mx-auto row mb-5">
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
				{renderPhotos()}
			</div>
		</header>
	)
}

export default Header
