import {ILoggedUserData} from "@shared/userTypes.ts";

export enum AuthActionType {
	GET_LOGGED_USER = 'GET_LOGGED_USER',
	LOGOUT = 'LOGOUT',
	SET_ERROR = 'SET_ERROR',
	GET_AVATAR = 'GET_AVATAR',
	PATCH_AVATAR = 'PATCH_AVATAR',
	DELETE_AVATAR = 'DELETE_AVATAR'
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

export interface IGetAvatar {
	type: AuthActionType.GET_AVATAR;
	payload: string;
}

export interface IDeleteAvatar {
	type: AuthActionType.DELETE_AVATAR;
}

export type AuthAction = IGetLoggedUser | ILogoutAction | ISetErrorAction | IGetAvatar | IDeleteAvatar;