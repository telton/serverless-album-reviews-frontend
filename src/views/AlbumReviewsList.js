import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, Col, Row, Spinner } from 'react-bootstrap';
import { getAllAlbumReviews } from '../lib/reviews';

const AlbumReviewsList = () => {
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getAllAlbumReviews().then((reviews) => {
			setReviews(reviews);
			setLoading(false);
		});
	}, []);

	if (loading) {
		return (
			<Row className="justify-content-center">
				<Spinner animation="border" role="status">
					<p className="sr-only">Loading...</p>
				</Spinner>
			</Row>
		);
	} else if (reviews.length <= 0) {
		return (
			<Row className="justify-content-center">
				<Alert variant="danger">
					No reviews found. <Link to="/new">Create one?</Link>
				</Alert>
			</Row>
		);
	}

	return (
		<Row>
			{reviews.map((review) => (
				<Col key={review.id} xs={12} md={8} lg={3}>
					<Card>
						<Card.Img
							variant="top"
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
							<Button
								className="mr-1"
								variant="primary"
								href={`/${review.id}`}
							>
								View
							</Button>
							<Button
								variant="secondary"
								href={`/${review.id}/edit`}
							>
								Edit
							</Button>
						</Card.Body>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default AlbumReviewsList;
