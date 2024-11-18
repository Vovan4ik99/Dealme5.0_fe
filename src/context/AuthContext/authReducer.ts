import {AuthAction, AuthActionType} from "./authActions.ts";
import {IAuthInitialState} from "./AuthContext.ts";

export const authReducer = (state: IAuthInitialState, action: AuthAction): IAuthInitialState => {
	switch (action.type) {
		case AuthActionType.GET_LOGGED_USER:
			return {
				...state,
				user: action.payload,
				loadingStatus: 'idle',
				errorMessage: null,
			};
		case AuthActionType.LOGOUT:
			return {
				...state,
				user: null,
				loadingStatus: 'idle',
				errorMessage: null,
			};
		case AuthActionType.SET_ERROR:
			return {
				...state,
				errorMessage: action.payload,
				loadingStatus: 'error',
			};
		default:
			return state;
	}
};