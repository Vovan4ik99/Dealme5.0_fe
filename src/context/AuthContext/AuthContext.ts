import {createContext} from "react";
import {LoadingStatusOptions} from "@hooks/http.hook.ts";
import {ILoggedUserData} from "@shared/userTypes.ts";

export const InitialAuthState: IAuthInitialState = {
	user: null,
	loadingStatus: 'idle',
	errorMessage: null,
}

export interface IAuthInitialState {
	user: ILoggedUserData | null;
	loadingStatus: LoadingStatusOptions;
	errorMessage: string | null;
}

export interface IAuthContextValue extends IAuthInitialState {
	logout: () => void;
	getLoggedUserData: (token: string) => void;
}

export const AuthContext = createContext<IAuthContextValue>({
	user: InitialAuthState.user,
	loadingStatus: InitialAuthState.loadingStatus,
	errorMessage: InitialAuthState.errorMessage,
	logout: () => {},
	getLoggedUserData: () => {},
});