import { useCallback, useContext, useEffect } from "react";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import { Outlet, useNavigate } from "react-router-dom";
import { ILoggedUserData } from "@shared/userTypes.ts";

const ProtectedRoute = () => {
	const { user, loadingStatus, getLoggedUserData } = useContext(AuthContext);
	const navigate = useNavigate();

	const token = localStorage.getItem('token');

	const getUserData = useCallback(() => {
		if (!token) {
			navigate("/login");
			return;
		}
		if (!user && loadingStatus === 'idle') {
			getLoggedUserData(token);
			return;
		}
		if (!user && loadingStatus === 'error') {
			navigate("/login");
		}
		if (user && !isProfileCompleted(user)) {
			navigate("/onboarding");
		}
	}, [ getLoggedUserData, loadingStatus, navigate, token, user ]);

	useEffect(() => {
		getUserData();
	}, [ getUserData, loadingStatus, navigate, user ]);

	const isProfileCompleted = (user: ILoggedUserData) => {
		const requiredFields = [
			"salesTools"
		];
		return !Object.entries(user)
			.filter(([ key ]) => requiredFields.includes(key))
			.map(([ , value ]) => value)
			.some(
				(value) =>
					value === null || (Array.isArray(value) && value.length === 0)
			);
	};

	return <Outlet/>;
};

export default ProtectedRoute