import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import { createReview } from '../lib/reviews';

const CreateAlbumReview = () => {
	const history = useHistory();

	const [review, setReview] = useState({
		album: '',
		albumUrl: '',
		band: '',
		genre: '',
		stars: 3,
		comments: '',
	});
	const [isLoading, setIsLoading] = useState(false);

	function onSubmit(event) {
		if (
			review.album &&
			review.albumUrl &&
			review.band &&
			review.genre &&
			parseInt(review.stars) &&
			review.comments
		) {
			event.preventDefault();

			// TODO: Better validation and feedback to user.
			if (review.stars < 1) {
				review.stars = 1;
			}
			if (review.stars > 5) {
				review.stars = 5;
			}

			setIsLoading(true);

			// TODO: Better form validation.
			createReview(review).then((data) => {
				if (data.id) {
					history.push(`/${data.id}`);
				} else {
					// TODO: Better error handling when failed update.
					console.error('Error updating. Returning to listing...');
					history.push('/');
				}
			});
		}
	}

	return (
		<Row>
			<Col>
				<Card>
					<Card.Body>
						<Form onSubmit={onSubmit}>
							<Form.Group controlId="formAlbum">
								<Form.Label>Album Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Album Name"
									value={review.album}
									onChange={(e) =>
										setReview({
											...review,
											album: e.target.value,
										})
									}
									required
									disabled={isLoading}
								/>
							</Form.Group>
							<Form.Group controlId="formAlbumUrl">
								<Form.Label>Album URL</Form.Label>
								<Form.Control
									type="text"
									placeholder="Album URL"
									value={review.albumUrl}
									onChange={(e) =>
										setReview({
											...review,
											albumUrl: e.target.value,
										})
									}
									required
									disabled={isLoading}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Band Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Band Name"
									value={review.band}
									onChange={(e) =>
										setReview({
											...review,
											band: e.target.value,
										})
									}
									required
									disabled={isLoading}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Genre</Form.Label>
								<Form.Control
									type="text"
									placeholder="Genre"
									value={review.genre}
									onChange={(e) =>
										setReview({
											...review,
											genre: e.target.value,
										})
									}
									required
									disabled={isLoading}
								/>
							</Form.Group>
							<Form.Group
								as={Row}
								className="justify-content-center my-2"
							>
								<Form.Label>Rating</Form.Label>
								<Col xs={12} sm={9}>
									<Form.Control
										type="range"
										custom
										step={1}
										min={1}
										max={5}
										value={review.stars}
										onChange={(e) => {
											const newVal =
												e.target.value <= 5
													? e.target.value
													: 5;
											setReview({
												...review,
												stars: newVal,
											});
										}}
										required
										disabled={isLoading}
									/>
								</Col>
								<Col xs={12} sm={2}>
									<Form.Control
										type="text"
										value={`${review.stars}/5`}
										readOnly
										disabled={isLoading}
									/>
								</Col>
							</Form.Group>
							<Form.Group>
								<Form.Label>Comments</Form.Label>
								<Form.Control
									as="textarea"
									rows={3}
									value={review.comments}
									onChange={(e) =>
										setReview({
											...review,
											comments: e.target.value,
										})
									}
									required
									disabled={isLoading}
								/>
							</Form.Group>

							<Button
								type="submit"
								variant="success"
								disabled={isLoading}
							>
								{isLoading ? (
									<Spinner animation="border" role="status">
										<p className="sr-only">Loading...</p>
									</Spinner>
								) : (
									'Create'
								)}
							</Button>
						</Form>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

export default CreateAlbumReview;
