import { AuthAction, AuthActionType } from "./authActions.ts";
import { IAuthInitialState } from "./AuthContext.ts";

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
		case AuthActionType.SET_LOADING:
			return {
				...state,
				loadingStatus: 'loading',
			};
		case AuthActionType.SET_LOGGED_INVESTOR_MAIL:
			return {
				...state,
				user: {
					id: 0, //dummy value, will not be used until full login
					email: action.payload,
					role: 'INVESTOR',
					firstName: '',
					lastName: '',
					isMock: true
				},
				loadingStatus: 'idle',
				errorMessage: null
			}
		default:
			return state;
	}
};