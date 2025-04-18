import { useCallback, useContext, useEffect } from "react";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import { Outlet, useNavigate } from "react-router-dom";
import { FREELANCER_PERMITTED_PAGES, MOCKED_INVESTOR_PERMITTED_PAGES } from "@constants/constans.ts";
import { ILoggedFreelancerData, ILoggedInvestorData, LoggedUserData } from "@shared/userTypes.ts";
import LoadingSpinner from "@ui/common/LoadingSpinner/LoadingSpinner.tsx";

const ProtectedRoute = () => {

	const { user, getLoggedUserData, loadingStatus } = useContext(AuthContext);

	const navigate = useNavigate();

	const token = localStorage.getItem('token');

	const currentPath = window.location.pathname;

	const handleLoggedFreelancer = useCallback(
		(loggedFreelancer: ILoggedFreelancerData) => {

			if (!loggedFreelancer.isOnboardingPassed && !FREELANCER_PERMITTED_PAGES.includes(currentPath)) {
				navigate("/freelancer/onboarding/start");
			}
		}, [ currentPath, navigate ]);

	const handleLoggedInvestor = useCallback(
		(loggedInvestor: ILoggedInvestorData) => {

			if (loggedInvestor.isMock && !MOCKED_INVESTOR_PERMITTED_PAGES.includes(currentPath)) {
				navigate("/investor/start");
			}
		}, [ currentPath, navigate ]);

	const handleLoggedUserData = useCallback(
		(loggedUserData: LoggedUserData) => {

			if (loggedUserData?.role === "FREELANCER") {
				handleLoggedFreelancer(loggedUserData);
				return;
			}
			if (loggedUserData?.role === "INVESTOR") {
				handleLoggedInvestor(loggedUserData);
			}
		}, [ handleLoggedFreelancer, handleLoggedInvestor ]);

	const getUserData = useCallback(() => {
		if (!token) {
			navigate("/login");
			return;
		}
		if (!user) {
			getLoggedUserData(token)
				.then(loggedUserData => {
					if (loggedUserData) {
						handleLoggedUserData(loggedUserData);
					}
				})
				.catch(() => {
					navigate("/login");
				})
			return;
		}
		handleLoggedUserData(user);
	}, [ token, user, handleLoggedUserData, navigate, getLoggedUserData ]);

	useEffect(getUserData, [ getUserData ]);

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return <Outlet/>;
};

export default ProtectedRoute