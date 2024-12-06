import {useContext} from "react";
import {AuthContext} from "@context/AuthContext/AuthContext.ts";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {ILoggedUserData} from "@shared/userTypes.ts";

const ProtectedRoute = () => {
	const {user} = useContext(AuthContext);
	const {pathname} = useLocation();

	const isProfileCompleted = (user: ILoggedUserData) => {
		return !Object.entries(user)
			.filter(([key]) => key !== 'crm')
			.map(([, value]) => value)
			.some(value => value === null || (Array.isArray(value) && value.length === 0));
	};
	if (!user) {
    return <Navigate to="/login" replace />;
  }
   if (!isProfileCompleted(user) && pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

	return <Outlet />;
};

export default ProtectedRoute;

