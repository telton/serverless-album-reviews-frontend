import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AlbumReviewsList from './views/AlbumReviewsList';
import CreateAlbumReview from './views/CreateAlbumReview';
import AlbumReview from './views/AlbumReview';
import EditAlbumReview from './views/EditAlbumReview';

import './app.css';

const App = () => {
	const {
		isLoading,
		isAuthenticated,
		loginWithRedirect,
		getIdTokenClaims,
	} = useAuth0();

	if (isLoading) {
		return (
			<Container className="flex-grow-1">
				<Row className="justify-content-center align-content-center">
					<Spinner animation="border" role="status">
						<p className="sr-only">Loading...</p>
					</Spinner>
				</Row>
			</Container>
		);
	}

	if (!isAuthenticated) {
		loginWithRedirect();
		return '';
	} else {
		getIdTokenClaims().then((token) => {
			// TODO: localStorage isn't the most secure way to store sensitive data, but this is just a demo.
			window.localStorage.setItem('token', JSON.stringify(token));
		});
	}

	return (
		<div id="app" className="d-flex flex-column h-100">
			<Navbar />
			<Container className="flex-grow-1 my-5">
				<Switch>
					<Route exact path="/">
						<AlbumReviewsList />
					</Route>
					<Route exact path="/new">
						<CreateAlbumReview />
					</Route>
					<Route exact path="/:id" children={<AlbumReview />} />
					<Route
						exact
						path="/:id/edit"
						children={<EditAlbumReview />}
					/>
				</Switch>
			</Container>
			<Footer />
		</div>
	);
};

export default App;
