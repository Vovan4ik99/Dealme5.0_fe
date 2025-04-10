import React, { useCallback, useMemo, useReducer } from "react";
import { useAuthService } from "@services/auth/authService.ts";
import { authReducer } from "./authReducer.ts";
import { AuthActionType } from "./authActions.ts";
import { AuthContext, IAuthContextValue, InitialAuthState } from "./AuthContext.ts";
import { UserRole } from "@shared/userTypes.ts";
import { jwtDecode } from "jwt-decode";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

	const {
		errorMessage,
		fetchInvestorData,
		fetchFreelancerData,
		getInvestorAuthToken,
		fetchAdminData
	} = useAuthService();

	const [ state, dispatch ] = useReducer(authReducer, InitialAuthState);

	const logout = useCallback(() => {
		localStorage.removeItem('token');
		dispatch({ type: AuthActionType.LOGOUT });
	}, []);

	const getLoggedUserData = useCallback(async (currentToken: string) => {
		dispatch({ type: AuthActionType.SET_LOADING });

		const role = jwtDecode<{ roles: UserRole[] }>(currentToken).roles[0];

		const handleError = (e: any) => {
			dispatch({ type: AuthActionType.SET_ERROR, payload: errorMessage ?? e });
			localStorage.removeItem('token');
			console.log(e);
		};

		if (role === 'FREELANCER') {
			return fetchFreelancerData()
				.then(response => {
					const userData = { ...response, role };
					dispatch({ type: AuthActionType.GET_LOGGED_USER, payload: userData });
					return userData;
				})
				.catch(handleError);
		}
		if (role === 'INVESTOR') {
			return fetchInvestorData()
				.then(response => {
					const userData = { ...response, role };
					dispatch({ type: AuthActionType.GET_LOGGED_USER, payload: userData });
					return userData;
				})
				.catch(handleError);
		}
		return fetchAdminData()
			.then(response => {
				const userData = { ...response, role };
				dispatch({ type: AuthActionType.GET_LOGGED_USER, payload: userData });
				return userData;
			})
			.catch(handleError);
	}, [ errorMessage, fetchAdminData, fetchFreelancerData, fetchInvestorData ]);

	const loginInvestor = useCallback(async () => {
		dispatch({ type: AuthActionType.SET_LOADING });

		return getInvestorAuthToken()
			.then(response => {
				localStorage.setItem('token', response.token);
				dispatch({ type: AuthActionType.SET_LOGGED_INVESTOR_MAIL, payload: response.email });
			}).catch(e => {
				console.log(e);
				dispatch({ type: AuthActionType.SET_ERROR, payload: errorMessage ?? e });
			});
	}, [ errorMessage, getInvestorAuthToken ]);

	const value: IAuthContextValue = useMemo(() => (
		{
			...state,
			logout,
			getLoggedUserData,
			loginInvestor
		}
	), [ getLoggedUserData, loginInvestor, logout, state ]);

	return <AuthContext.Provider value={ value }>
		{ children }
	</AuthContext.Provider>;
};



