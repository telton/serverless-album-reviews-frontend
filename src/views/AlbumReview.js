import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Alert, Button, Card, Col, Row, Spinner } from 'react-bootstrap';
import { getReviewById, deleteReview } from '../lib/reviews';

const AlbumReview = () => {
	const { id } = useParams();
	const history = useHistory();

	const [review, setReview] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(
		() =>
			getReviewById(id).then((review) => {
				setReview(review);
				setLoading(false);
			}),
		[id]
	);

	if (loading) {
		return (
			<Row className="justify-content-center">
				<Spinner animation="border" role="status">
					<p className="sr-only">Loading...</p>
				</Spinner>
			</Row>
		);
	} else if (!review && !loading) {
		return (
			<Row className="justify-content-center">
				<Alert variant="error">Alert not found.</Alert>
			</Row>
		);
	}

	const onDelete = () => {
		deleteReview(id).then((isDeleted) => {
			if (!isDeleted) {
				// TODO: Better error handling on failure.
				console.error(`Error deleting review id: ${id}!`);
			}
			history.push('/');
		});
	};

	return (
		<Row className="justify-content-center">
			<Col xs={8}>
				<Card>
					<Card.Img
						src={review.albumUrl}
						alt={`${review.album} by ${review.band}`}
					/>
					<Card.Body>
						<Card.Title>{review.album}</Card.Title>
						<Card.Subtitle className="mb-2">
							by {review.band}
						</Card.Subtitle>
						<Card.Subtitle className="mb-2">
							{`Rating: (${review.stars}/5)`}
						</Card.Subtitle>
						<Card.Text>"{review.comments}"</Card.Text>
						<Button
							className="mr-1"
							variant="primary"
							href={`/${id}/edit`}
						>
							Edit
						</Button>
						<Button variant="danger" onClick={onDelete}>
							Delete
						</Button>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

export default AlbumReview;
