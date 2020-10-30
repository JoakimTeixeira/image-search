import React from 'react'

const Photos = ({ photos, searchTerm }) => {
	return (
		<section className="row mb-5">
			{photos.map((photo) => {
				return (
					<div key={photo.id} className="col-md-4 mb-3">
						<picture className="thumbnail">
							<a href={photo.url} target="_blank" rel="noreferrer">
								<img
									src={photo.src.medium}
									className="img-fluid img-thumbnail"
									alt={`${searchTerm}`}
									width="100%"
								/>
							</a>
						</picture>
					</div>
				)
			})}
		</section>
	)
}

export default Photos
