import {ILoggedUserData} from "@shared/userTypes.ts";

export enum AuthActionType {
	GET_LOGGED_USER = 'GET_LOGGED_USER',
	LOGOUT = 'LOGOUT',
	SET_ERROR = 'SET_ERROR',
}

export interface IGetLoggedUser {
	type: AuthActionType.GET_LOGGED_USER;
	payload: ILoggedUserData;
}

export interface ILogoutAction {
	type: AuthActionType.LOGOUT;
}

export interface ISetErrorAction {
	type: AuthActionType.SET_ERROR;
	payload: string;
}


export type AuthAction = IGetLoggedUser | ILogoutAction | ISetErrorAction;