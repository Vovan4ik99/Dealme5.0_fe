import {createContext} from "react";
import {LoadingStatusOptions} from "../../hooks/http.hook.ts";
import {LoggedUserData} from "../../shared/userTypes.ts";

export const InitialAuthState: IAuthInitialState = {
	user: null,
	loadingStatus: 'idle',
	errorMessage: null,
}

export interface IAuthInitialState {
	user: LoggedUserData | null;
	loadingStatus: LoadingStatusOptions;
	errorMessage: string | null;
}

export interface AuthContextValue extends IAuthInitialState {
	logout: () => void;
	getLoggedUserData: (token: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>({
	user: InitialAuthState.user,
	loadingStatus: InitialAuthState.loadingStatus,
	errorMessage: InitialAuthState.errorMessage,
	logout: () => {},
	getLoggedUserData: () => Promise.resolve()
});