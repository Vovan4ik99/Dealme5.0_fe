import React, {useCallback, useMemo, useReducer} from "react";
import {useAuthService} from "../../services/authService.ts";
import {authReducer} from "./authReducer.ts";
import {AuthActionType} from "./authActions.ts";
import {LoginData} from "../../components/LoginForm/loginFormTypes.ts";
import {AuthContext, AuthContextValue, InitialAuthState} from "./AuthContext.ts";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
	const {login: authLogin, loadingStatus, errorMessage} = useAuthService();
	const [state, dispatch] = useReducer(authReducer, InitialAuthState);

	const login = useCallback(async (loginData: LoginData) => {
		await authLogin(loginData)
			.then((user) => dispatch({type: AuthActionType.LOGIN, payload: user}))
			.catch(e => {
				dispatch({type: AuthActionType.SET_ERROR, payload: errorMessage ?? 'Login failed'});
				console.log(e);
			});
	}, [authLogin, errorMessage]);

	const logout = useCallback(() => {
		localStorage.removeItem('token');
		dispatch({type: AuthActionType.LOGOUT});
	}, []);

	const value: AuthContextValue = useMemo(() => ({
		...state, loadingStatus, errorMessage, login, logout
	}), [errorMessage, loadingStatus, login, logout, state]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};



