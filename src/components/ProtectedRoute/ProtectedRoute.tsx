import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext/AuthContext.ts";
import {useNavigate} from "react-router-dom";

const ProtectedRoute: React.FC<{children: React.ReactNode}> = ({children}) => {
	const { user, getLoggedUserData } = useContext(AuthContext);
	const navigate = useNavigate();
	const [isUserLoading, setIsUserLoading] = useState(true);

	useEffect(() => {
		console.log("rendering ProtectedRoute");
		const token = localStorage.getItem("token");
		if (!token) {
			navigate("/login");
			return;
		}

		getLoggedUserData(token)
			.then(() => setIsUserLoading(false))
			.catch((e) => {
				console.log(e);
				navigate("/login");
			});
	}, [getLoggedUserData, navigate]);

	useEffect(() => {
		if (!isUserLoading && !user) {
			console.log("redirecting to login due to missing user data");
			navigate("/login");
		}
	}, [isUserLoading, navigate, user]);

	return <>{children}</>;
}

export default ProtectedRoute;