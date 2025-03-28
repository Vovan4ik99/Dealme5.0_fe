import { useCallback, useContext, useEffect } from "react";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import { Outlet, useNavigate } from "react-router-dom";
import { MOCKED_INVESTOR_PERMITTED_PAGES } from "@constants/constans.ts";

const ProtectedRoute = () => {

	const { user, getLoggedUserData } = useContext(AuthContext);

	const navigate = useNavigate();

	const token = localStorage.getItem('token');

	const currentPath = window.location.pathname;

	const getUserData = useCallback(() => {
		if (!token) {
			navigate("/login");
			return;
		}
		if (!user) {
			getLoggedUserData(token)
				.then(loggedUserData => {
					if (loggedUserData?.role === "FREELANCER" && !loggedUserData.isOnboardingPassed) {
						navigate("/onboarding");
						return;
					}
				})
				.catch(() => {
					navigate("/login");
					return;
				})
		}
		if (user?.role === "INVESTOR" && user.isMock && !MOCKED_INVESTOR_PERMITTED_PAGES.includes(currentPath)) {
			navigate("/investor/start");
			return;
		}
	}, [token, user, currentPath, navigate, getLoggedUserData]);

	useEffect(getUserData, [ getUserData ]);

	return <Outlet/>;
};

export default ProtectedRoute