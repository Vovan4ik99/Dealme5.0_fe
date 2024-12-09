import React, {useCallback, useEffect, useMemo, useReducer} from "react";
import {useAuthService} from "@services/authService.ts";
import {authReducer} from "./authReducer.ts";
import {AuthActionType} from "./authActions.ts";
import {AuthContext, IAuthContextValue, InitialAuthState} from "./AuthContext.ts";
import {ILoggedUserResponse, UserRole} from "@shared/userTypes.ts";
import {jwtDecode} from "jwt-decode";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
	const {loadingStatus, errorMessage, fetchLoggedUserData} = useAuthService();
	const [state, dispatch] = useReducer(authReducer, InitialAuthState);

	const logout = useCallback(() => {
		localStorage.removeItem('token');
		dispatch({type: AuthActionType.LOGOUT});
	}, []);

	const getLoggedUserData = useCallback(async (currentToken: string) => {
		const role = getUserRole(currentToken);
		await fetchLoggedUserData(role)
			.then((response: ILoggedUserResponse) => {
				dispatch({type: AuthActionType.GET_LOGGED_USER, payload: {role, ...response}})
			}).catch(e => {
				dispatch({type: AuthActionType.SET_ERROR, payload: errorMessage ?? e});
				localStorage.removeItem('token');
				console.log(e);
			})
	}, [fetchLoggedUserData, errorMessage]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			getLoggedUserData(token)
				.catch(e => {
					console.log(e);
				});
		}
	}, [errorMessage, getLoggedUserData]);

	const getUserRole = (currentToken: string): UserRole => {
		const decodedToken = jwtDecode<{ roles: UserRole[] }>(currentToken);
		return decodedToken.roles[0];
	}

	const value: IAuthContextValue = useMemo(() => (
		{
			...state,
			loadingStatus,
			logout,
			getLoggedUserData
		}
	), [getLoggedUserData, loadingStatus, logout, state]);

	return <AuthContext.Provider value={value}>
		{children}
	</AuthContext.Provider>;
};



