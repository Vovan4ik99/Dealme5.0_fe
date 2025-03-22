import React, {useCallback, useMemo, useReducer} from "react";
import {useAuthService} from "@services/auth/authService.ts";
import {authReducer} from "./authReducer.ts";
import {AuthActionType} from "./authActions.ts";
import {AuthContext, IAuthContextValue, InitialAuthState} from "./AuthContext.ts";
import { ILoggedUserResponse, UserRole } from "@shared/userTypes.ts";
import {jwtDecode} from "jwt-decode";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { errorMessage, fetchLoggedUserData } = useAuthService();

	const [ state, dispatch ] = useReducer(authReducer, InitialAuthState);

	const logout = useCallback(() => {
		localStorage.removeItem('token');
		dispatch({ type: AuthActionType.LOGOUT });
	}, []);

	const getLoggedUserData = useCallback((currentToken: string) => {
		dispatch({ type: AuthActionType.SET_LOADING_STATUS, payload: 'loading' });

		const role = getUserRole(currentToken);

		fetchLoggedUserData(role)
			.then((response: ILoggedUserResponse) => {
				dispatch({ type: AuthActionType.GET_LOGGED_USER, payload: { role, ...response } });
			})
			.catch(e => {
					dispatch({ type: AuthActionType.SET_ERROR, payload: errorMessage ?? e });
					dispatch({ type: AuthActionType.SET_LOADING_STATUS, payload: 'error' });
					localStorage.removeItem('token');
					console.log(e);
				}
			)
	}, [ fetchLoggedUserData, errorMessage ]);

	const getUserRole = (currentToken: string): UserRole => {
		const decodedToken = jwtDecode<{ roles: UserRole[] }>(currentToken);
		return decodedToken.roles[0];
	};

	const value: IAuthContextValue = useMemo(() => (
		{
			...state,
			logout,
			getLoggedUserData,
		}
	), [ getLoggedUserData, logout, state ]);

	return <AuthContext.Provider value={ value }>
		{ children }
	</AuthContext.Provider>;
};



