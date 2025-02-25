import { ILoggedUserData } from "@shared/userTypes.ts";
import { LoadingStatusOptions } from "@hooks/http.hook.ts";

export enum AuthActionType {
	GET_LOGGED_USER = 'GET_LOGGED_USER',
	LOGOUT = 'LOGOUT',
	SET_ERROR = 'SET_ERROR',
	SET_LOADING_STATUS = 'SET_LOADING_STATUS',
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

export interface ISetLoadingStatus {
	type: AuthActionType.SET_LOADING_STATUS;
	payload: LoadingStatusOptions;
}

export type AuthAction = IGetLoggedUser | ILogoutAction | ISetErrorAction
	| ISetLoadingStatus;