import React, {useCallback, useEffect, useMemo, useReducer} from "react";
import {useAuthService} from "../../services/authService.ts";
import {authReducer} from "./authReducer.ts";
import {AuthActionType} from "./authActions.ts";
import {AuthContext, IAuthContextValue, InitialAuthState} from "./AuthContext.ts";
import {ILoggedUserResponse, UserRole} from "../../shared/userTypes.ts";
import {jwtDecode} from "jwt-decode";
import {ILoginRequest, ILoginResponse} from "../../shared/loginTypes.ts";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
	const {loadingStatus, errorMessage, fetchLoggedUserData, login: authLogin} = useAuthService();
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
				dispatch({type: AuthActionType.SET_ERROR, payload: errorMessage ?? 'Failed to fetch user data'});
				localStorage.removeItem('token');
				console.log(e);
			})
	}, [fetchLoggedUserData, errorMessage]);

	const login = useCallback(async (request: ILoginRequest) => {
		return await authLogin(request)
			.then((response: ILoginResponse) => {
				localStorage.setItem('token', response.token);
				getLoggedUserData(response.token);
			}).catch((e) => {
				console.log(e);
				dispatch({type: AuthActionType.SET_ERROR, payload: errorMessage ?? 'Failed to login'})
			});
	}, [authLogin, errorMessage, getLoggedUserData])

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			getLoggedUserData(token)
				.catch(e => console.log(e));
		}
	}, [getLoggedUserData])

	const getUserRole = (currentToken: string): UserRole => {
		const decodedToken = jwtDecode<{ roles: UserRole[] }>(currentToken);
		return decodedToken.roles[0];
	}

	const value: IAuthContextValue = useMemo(() => (
		{
			...state,
			loadingStatus,
			logout,
			login,
		}
	), [loadingStatus, login, logout, state]);

	return <AuthContext.Provider value={value}>
		{children}
	</AuthContext.Provider>;
};



