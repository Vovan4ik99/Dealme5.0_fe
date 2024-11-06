import {UserDataResponse} from "../../components/LoginPage/types.ts";

export enum AuthActionType {
	LOGIN = 'LOGIN',
	LOGOUT = 'LOGOUT',
	SET_ERROR = 'SET_ERROR',
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