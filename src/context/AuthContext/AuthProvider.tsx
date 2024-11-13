import React, {useCallback, useMemo, useReducer} from "react";
import {useAuthService} from "../../services/authService.ts";
import {authReducer} from "./authReducer.ts";
import {AuthActionType} from "./authActions.ts";
import {AuthContext, AuthContextValue, InitialAuthState} from "./AuthContext.ts";
import {LoggedUserResponse, UserRole} from "../../shared/userTypes.ts";
import {jwtDecode} from "jwt-decode";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
	const {loadingStatus, errorMessage, fetchLoggedUserData} = useAuthService();
	const [state, dispatch] = useReducer(authReducer, InitialAuthState);

	const logout = useCallback(() => {
		localStorage.removeItem('token');
		dispatch({type: AuthActionType.LOGOUT});
	}, []);

	const getLoggedUserData = useCallback(async (token: string) => {
		const role = getUserRole(token);
		await fetchLoggedUserData(role)
			.then((response: LoggedUserResponse) => (
				dispatch({type: AuthActionType.LOGIN, payload: {role, ...response}})
			)).catch(e => {
				dispatch({type: AuthActionType.SET_ERROR, payload: errorMessage ?? 'Failed to fetch user data'});
				localStorage.removeItem('token');
				console.log(e);
			})
	}, [fetchLoggedUserData, errorMessage]);

	const getUserRole = (token: string): UserRole => {
		const decodedToken = jwtDecode<{ roles: UserRole[] }>(token);
		return decodedToken.roles[0];
	}

	const value: AuthContextValue = useMemo(() => ({
		...state, loadingStatus, errorMessage, logout, getLoggedUserData
	}), [errorMessage, getLoggedUserData, loadingStatus, logout, state]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};



