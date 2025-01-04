import React, {useCallback, useEffect, useMemo, useReducer} from "react";
import {useAuthService} from "@services/authService.ts";
import {authReducer} from "./authReducer.ts";
import {AuthActionType} from "./authActions.ts";
import {AuthContext, IAuthContextValue, InitialAuthState} from "./AuthContext.ts";
import {ILoggedUserResponse, UserRole} from "@shared/userTypes.ts";
import {jwtDecode} from "jwt-decode";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
	const {loadingStatus, errorMessage, fetchLoggedUserData, getAvatar, patchAvatar, deleteAvatar} = useAuthService();
	const [state, dispatch] = useReducer(authReducer, InitialAuthState);

	const logout = useCallback(() => {
		localStorage.removeItem('token');
		dispatch({type: AuthActionType.LOGOUT});
	}, []);

	const getLoggedUserData = useCallback((currentToken: string) => {
		const role = getUserRole(currentToken);
		fetchLoggedUserData(role)
			.then((response: ILoggedUserResponse) => {
				dispatch({type: AuthActionType.GET_LOGGED_USER, payload: {role, ...response}})
			}).catch(e => {
				dispatch({type: AuthActionType.SET_ERROR, payload: errorMessage ?? e});
				localStorage.removeItem('token');
				console.log(e);
			})
	}, [fetchLoggedUserData, errorMessage]);

	const getUserAvatar = useCallback(() => {
		getAvatar()
			.then(response => response &&
				dispatch({type: AuthActionType.GET_AVATAR, payload: response.picture}))
			.catch(e => dispatch({type: AuthActionType.SET_ERROR, payload: errorMessage ?? e}));
	}, [errorMessage, getAvatar]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			getLoggedUserData(token);
			getUserAvatar();
		}
	}, [errorMessage, getLoggedUserData, getUserAvatar]);

	const getUserRole = (currentToken: string): UserRole => {
		const decodedToken = jwtDecode<{ roles: UserRole[] }>(currentToken);
		return decodedToken.roles[0];
	};

	const deleteUserAvatar = useCallback(() => {
		deleteAvatar()
			.then(() => dispatch({type: AuthActionType.DELETE_AVATAR}))
			.catch(e => dispatch({type: AuthActionType.SET_ERROR, payload: errorMessage ?? e}));
	}, [deleteAvatar, errorMessage]);

	const patchUserAvatar = useCallback((avatar: FormData) => {
		patchAvatar(avatar)
			.then(() => getUserAvatar())
			.catch(e => dispatch({type: AuthActionType.SET_ERROR, payload: errorMessage ?? e}));
	}, [errorMessage, getUserAvatar, patchAvatar]);

	const value: IAuthContextValue = useMemo(() => (
		{
			...state,
			loadingStatus,
			logout,
			getLoggedUserData,
			deleteUserAvatar,
			patchUserAvatar
		}
	), [deleteUserAvatar, getLoggedUserData, getUserAvatar, loadingStatus, logout, patchUserAvatar, state]);

	return <AuthContext.Provider value={value}>
		{children}
	</AuthContext.Provider>;
};



