import {UserDataResponse} from "../../components/LoginForm/loginFormTypes.ts";

export enum AuthActionType {
	LOGIN = 'LOGIN',
	LOGOUT = 'LOGOUT',
	SET_ERROR = 'SET_ERROR',
	CREATE_USER = 'CREATE_USER'
}

export interface LoginAction {
	type: AuthActionType.LOGIN;
	payload: UserDataResponse;
}

export interface LogoutAction {
	type: AuthActionType.LOGOUT;
}

export interface SetErrorAction {
	type: AuthActionType.SET_ERROR;
	payload: string;
}

export type AuthAction = LoginAction | LogoutAction | SetErrorAction;