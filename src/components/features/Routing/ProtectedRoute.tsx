import { useCallback, useContext, useEffect } from "react";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import { Outlet, useNavigate } from "react-router-dom";

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
		if (user && !user?.isOnboardingPassed) {
			navigate("/onboarding");
		}
	}, [ getLoggedUserData, loadingStatus, navigate, token, user ]);

	useEffect(() => {
		getUserData();
	}, [ getUserData, loadingStatus, navigate, user ]);

	return <Outlet/>;
};

export default ProtectedRoute