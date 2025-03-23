import React, { useCallback, useMemo, useReducer } from "react";
import { useAuthService } from "@services/auth/authService.ts";
import { authReducer } from "./authReducer.ts";
import { AuthActionType } from "./authActions.ts";
import { AuthContext, IAuthContextValue, InitialAuthState } from "./AuthContext.ts";
import { ILoggedUserResponse, UserRole } from "@shared/userTypes.ts";
import { jwtDecode } from "jwt-decode";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { errorMessage, fetchLoggedUserData, getInvestorAuthToken } = useAuthService();

	const [ state, dispatch ] = useReducer(authReducer, InitialAuthState);

	const logout = useCallback(() => {
		localStorage.removeItem('token');
		dispatch({ type: AuthActionType.LOGOUT });
	}, []);

	const getLoggedUserData = useCallback(async (currentToken: string) => {
		dispatch({ type: AuthActionType.SET_LOADING_STATUS, payload: 'loading' });

		const role = jwtDecode<{ roles: UserRole[] }>(currentToken).roles[0];

		return fetchLoggedUserData(role)
			.then((response: ILoggedUserResponse) => {
				const userData = { role, ...response };
				dispatch({ type: AuthActionType.GET_LOGGED_USER, payload: userData });
				return userData;
			})
			.catch(e => {
					dispatch({ type: AuthActionType.SET_ERROR, payload: errorMessage ?? e });
					dispatch({ type: AuthActionType.SET_LOADING_STATUS, payload: 'error' });
					localStorage.removeItem('token');
					console.log(e);
				}
			)
	}, [ fetchLoggedUserData, errorMessage ]);

	const loginInvestor = useCallback(async () => {
		dispatch({ type: AuthActionType.SET_LOADING_STATUS, payload: 'loading' });

		return getInvestorAuthToken()
			.then(response => {
				localStorage.setItem('token', response.token);
				dispatch({ type: AuthActionType.SET_LOGGED_INVESTOR_MAIL, payload: response.email });
			}).catch(e => {
				console.log(e);
				dispatch({ type: AuthActionType.SET_LOADING_STATUS, payload: 'error' });
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



