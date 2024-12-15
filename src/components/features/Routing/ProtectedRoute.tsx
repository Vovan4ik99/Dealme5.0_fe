import { useContext, useEffect } from "react";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import { Outlet, useNavigate } from "react-router-dom";
import { ILoggedUserData } from "@shared/userTypes.ts";

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/login");
			return;
		}
		if (!isProfileCompleted(user)) {
			navigate("/onboarding");
		}
	}, [navigate, user]);

  const isProfileCompleted = (user: ILoggedUserData) => {
    return !Object.entries(user)
      .filter(([key]) => key !== "crm")
      .map(([, value]) => value)
      .some(
        (value) =>
          value === null || (Array.isArray(value) && value.length === 0)
      );
  };

	return <Outlet/>;
}

export default ProtectedRoute;