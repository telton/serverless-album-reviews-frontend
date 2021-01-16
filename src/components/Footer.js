import React from 'react';

const Footer = () => {
	const now = new Date();

	return (
		<footer className="bg-light p-3 text-center">
			<p>&copy; Tyler Elton {now.getFullYear()}</p>
		</footer>
	);
};

export default Footer;
