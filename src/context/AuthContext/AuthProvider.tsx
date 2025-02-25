import React, { useCallback, useMemo, useReducer } from "react";
import { useAuthService } from "@services/auth/authService.ts";
import { authReducer } from "./authReducer.ts";
import { AuthActionType } from "./authActions.ts";
import { AuthContext, IAuthContextValue, InitialAuthState } from "./AuthContext.ts";
import { ILoggedUserResponse, UserRole } from "@shared/userTypes.ts";
import { jwtDecode } from "jwt-decode";
import { useFreelancerAvatarService } from "@services/freelancer/freelancerAvatarService.ts";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { errorMessage, fetchLoggedUserData } = useAuthService();
	const {
		errorMessage: avatarErrorMessage,
		getAvatar,
		deleteAvatar,
		patchAvatar
	} = useFreelancerAvatarService();

	const [ state, dispatch ] = useReducer(authReducer, InitialAuthState);

	const logout = useCallback(() => {
		localStorage.removeItem('token');
		dispatch({ type: AuthActionType.LOGOUT });
	}, []);

	const getUserAvatar = useCallback(() => {
		dispatch({ type: AuthActionType.SET_LOADING_STATUS, payload: 'loading' });

		getAvatar()
			.then(response => {
					if (response) {
						dispatch({ type: AuthActionType.GET_AVATAR, payload: response.picture })
					}
					dispatch({ type: AuthActionType.SET_LOADING_STATUS, payload: 'idle' });
				}
			)
			.catch(e => {
					dispatch({ type: AuthActionType.SET_ERROR, payload: avatarErrorMessage ?? e });
					dispatch({ type: AuthActionType.SET_LOADING_STATUS, payload: 'error' });
				}
			);
	}, [ avatarErrorMessage, getAvatar ]);

	const getLoggedUserData = useCallback((currentToken: string) => {
		dispatch({ type: AuthActionType.SET_LOADING_STATUS, payload: 'loading' });

		const role = getUserRole(currentToken);

		fetchLoggedUserData(role)
			.then((response: ILoggedUserResponse) => {
				dispatch({ type: AuthActionType.GET_LOGGED_USER, payload: { role, ...response } });
				getUserAvatar();
			})
			.catch(e => {
					dispatch({ type: AuthActionType.SET_ERROR, payload: errorMessage ?? e });
					dispatch({ type: AuthActionType.SET_LOADING_STATUS, payload: 'error' });
					localStorage.removeItem('token');
					console.log(e);
				}
			)
	}, [ fetchLoggedUserData, getUserAvatar, errorMessage ]);

	const getUserRole = (currentToken: string): UserRole => {
		const decodedToken = jwtDecode<{ roles: UserRole[] }>(currentToken);
		return decodedToken.roles[0];
	};

	const deleteUserAvatar = useCallback(() => {
		dispatch({ type: AuthActionType.SET_LOADING_STATUS, payload: 'loading' });

		deleteAvatar()
			.then(() => {
				dispatch({ type: AuthActionType.DELETE_AVATAR })
				dispatch({ type: AuthActionType.SET_LOADING_STATUS, payload: 'idle' });
			})
			.catch(e => {
				dispatch({ type: AuthActionType.SET_ERROR, payload: avatarErrorMessage ?? e })
				dispatch({ type: AuthActionType.SET_LOADING_STATUS, payload: 'error' });
			});
	}, [ avatarErrorMessage, deleteAvatar ]);

	const patchUserAvatar = useCallback((avatar: FormData) => {
		dispatch({ type: AuthActionType.SET_LOADING_STATUS, payload: 'loading' });

		patchAvatar(avatar)
			.then(() => {
				getUserAvatar();
			})
			.catch(e => {
				dispatch({ type: AuthActionType.SET_ERROR, payload: avatarErrorMessage ?? e })
				dispatch({ type: AuthActionType.SET_LOADING_STATUS, payload: 'error' });
			});
	}, [ avatarErrorMessage, getUserAvatar, patchAvatar ]);

	const value: IAuthContextValue = useMemo(() => (
		{
			...state,
			logout,
			getLoggedUserData,
			deleteUserAvatar,
			patchUserAvatar
		}
	), [ deleteUserAvatar, getLoggedUserData, logout, patchUserAvatar, state ]);

	return <AuthContext.Provider value={ value }>
		{ children }
	</AuthContext.Provider>;
};



