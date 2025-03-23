import { useCallback, useContext, useEffect } from "react";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
	const { user, getLoggedUserData } = useContext(AuthContext);

	const navigate = useNavigate();

	const token = localStorage.getItem('token');

	const getUserData = useCallback(() => {
		if (!token) {
			navigate("/login");
			return;
		}
		if (!user) {
			getLoggedUserData(token)
				.then(loggedUserData => {
					if (!loggedUserData) {
						navigate("/login");
						return;
					}
					if (loggedUserData.role === "FREELANCER" && !loggedUserData.isOnboardingPassed) {
						navigate("/onboarding");
						return;
					}
					navigate("/profile");
				});
			return;
		}
	}, [ navigate, user, token, getLoggedUserData ]);

	useEffect(getUserData, [ getUserData ]);

	return <Outlet/>;
};

export default ProtectedRoute