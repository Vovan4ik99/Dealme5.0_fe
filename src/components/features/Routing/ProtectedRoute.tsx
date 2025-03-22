import { useCallback, useContext, useEffect } from "react";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthService } from "@services/auth/authService.ts";

const ProtectedRoute = () => {
	const { user, loadingStatus, getLoggedUserData } = useContext(AuthContext);

	const navigate = useNavigate();

	const { fetchLoggedUserData } = useAuthService();

	const token = localStorage.getItem('token');

	const checkFreelancerOnboardingStatus = useCallback(() => {
		fetchLoggedUserData(user!.role)
			.then(response => {
				if (!response.isOnboardingPassed) {
						navigate("/onboarding");
					}
				})
			.catch(console.error);
	}, [ fetchLoggedUserData, navigate, user ]);

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
		if (user && user.role === "FREELANCER") {
			checkFreelancerOnboardingStatus();
		}
	}, [ loadingStatus, navigate, user, checkFreelancerOnboardingStatus, token, getLoggedUserData ]);

	useEffect(getUserData, [ getUserData, loadingStatus, navigate, user ]);

	return <Outlet/>;
};

export default ProtectedRoute