const BASE_URL = process.env.REACT_APP_BASE_API_URL;

const getFullUrl = (query) =>
	`${BASE_URL}?query=${encodeURIComponent(query.trim())}`;

const getIdToken = () => {
	const token = JSON.parse(window.localStorage.getItem('token') || null);
	return token?.__raw || null;
};

export const getAllAlbumReviews = () => {
	const token = getIdToken();
	const query = `
	{
		getAllAlbumReviews {
			id
			album
			albumUrl
			band
			genre
			stars
			comments
		}
	}
	`;

	return fetch(getFullUrl(query), {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => res.json())
		.then((data) => data.getAllAlbumReviews || []);
};

export const getReviewById = (id) => {
	const token = getIdToken();
	const query = `
	{
		getAlbumReview(id: "${id}") {
			id
			album
			albumUrl
			band
			genre
			stars
			comments
		}
	}
	`;

	return fetch(getFullUrl(query), {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => res.json())
		.then((data) => data.getAlbumReview || null);
};

export const createReview = ({
	album,
	albumUrl,
	band,
	genre,
	stars,
	comments,
}) => {
	const token = getIdToken();
	const mutation = `
	mutation {
		createAlbumReview(album: "${album}",
			albumUrl: "${albumUrl}",
			band: "${band}",
			genre: "${genre}",
			stars: ${stars},
			comments: "${comments}"
		) {
			id
		}
	}
	`;

	return fetch(getFullUrl(mutation), {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => res.json())
		.then((data) => data.createAlbumReview || null);
};

export const updateReview = ({
	id,
	album,
	albumUrl,
	band,
	genre,
	stars,
	comments,
}) => {
	const token = getIdToken();
	const mutation = `
	mutation {
		updateAlbumReview(id: "${id}",
			album: "${album}",
			albumUrl: "${albumUrl}",
			band: "${band}",
			genre: "${genre}",
			stars: ${stars},
			comments: "${comments}"
		) {
			id
		}
	}
	`;

	return fetch(getFullUrl(mutation), {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => res.json())
		.then((data) => data.updateAlbumReview || null);
};

export const deleteReview = (id) => {
	const token = getIdToken();
	const mutation = `
	mutation {
		deleteAlbumReview(id: "${id}")
	}
	`;

	return fetch(getFullUrl(mutation), {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => res.json())
		.then((data) => data.deleteAlbumReview || false);
};
