import {useContext, useEffect} from "react";
import {AuthContext} from "../../../context/AuthContext/AuthContext.ts";
import {Outlet, useNavigate} from "react-router-dom";

const PublicRoute = () => {
	const {user} = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/");
			return;
		}
	}, [navigate, user]);

	return <Outlet/>
}

export default PublicRoute;