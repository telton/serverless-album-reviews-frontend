import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
	const { logout } = useAuth0();

	return (
		<Button
			onClick={() => logout()}
			id="qsLogoutBtn"
			variant="secondary"
			className="btn-margin"
		>
			Log Out
		</Button>
	);
};

export default LogoutButton;
