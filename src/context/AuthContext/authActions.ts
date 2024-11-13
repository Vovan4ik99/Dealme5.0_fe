import {LoggedUserData} from "../../shared/userTypes.ts";

export enum AuthActionType {
	LOGIN = 'LOGIN',
	LOGOUT = 'LOGOUT',
	SET_ERROR = 'SET_ERROR',
	SET_LOADING = 'SET_LOADING'
}

export interface LoginAction {
	type: AuthActionType.LOGIN;
	payload: LoggedUserData;
}

export interface LogoutAction {
	type: AuthActionType.LOGOUT;
}

export interface SetErrorAction {
	type: AuthActionType.SET_ERROR;
	payload: string;
}

export interface LoadingStatusAction {
	type: AuthActionType.SET_LOADING;
}

export type AuthAction = LoginAction | LogoutAction | SetErrorAction | LoadingStatusAction;