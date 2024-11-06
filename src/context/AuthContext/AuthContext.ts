import {createContext} from "react";
import {LoginData, UserDataResponse} from "../../components/LoginPage/types.ts";
import {LoadingStatusOptions} from "../../hooks/http.hook.ts";

export const InitialAuthState: IAuthInitialState = {
	user: null,
	loadingStatus: 'idle',
	errorMessage: null,
}

export interface IAuthInitialState {
	user: UserDataResponse | null;
	loadingStatus: LoadingStatusOptions;
	errorMessage: string | null;
}

export interface AuthContextValue extends IAuthInitialState {
	login: (loginData: LoginData) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
	user: InitialAuthState.user,
	loadingStatus: InitialAuthState.loadingStatus,
	errorMessage: InitialAuthState.errorMessage,
	login: () => {},
	logout: () => {}
});