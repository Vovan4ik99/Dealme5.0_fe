import { LoggedUserData } from "@shared/userTypes.ts";

export enum AuthActionType {
	GET_LOGGED_USER = 'GET_LOGGED_USER',
	LOGOUT = 'LOGOUT',
	SET_ERROR = 'SET_ERROR',
	SET_LOADING = 'SET_LOADING',
	SET_LOGGED_INVESTOR_MAIL = 'SET_LOGGED_INVESTOR_MAIL',
}

export interface IGetLoggedUser {
	type: AuthActionType.GET_LOGGED_USER;
	payload: LoggedUserData;
}

export interface ILogoutAction {
	type: AuthActionType.LOGOUT;
}

export interface ISetErrorAction {
	type: AuthActionType.SET_ERROR;
	payload: string;
}

export interface ISetLoading {
	type: AuthActionType.SET_LOADING;
}

export interface ISetLoggedMockedInvestor {
	type: AuthActionType.SET_LOGGED_INVESTOR_MAIL;
	payload: string;
}

export type AuthAction = IGetLoggedUser | ILogoutAction | ISetErrorAction | ISetLoading
	| ISetLoggedMockedInvestor;