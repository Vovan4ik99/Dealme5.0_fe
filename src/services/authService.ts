import {useHttp} from "../hooks/http.hook.ts";
import {useCallback} from "react";
import {ErrorMessage} from "../constans/ErrorMessage.ts";
import {CreateUserRequest, CreateUserResponse, LoggedUserResponse, UserRole} from "../shared/userTypes.ts";
import {LoginRequest, LoginResponse} from "../shared/loginTypes.ts";

export const useAuthService = () => {
	const {sendRequest, loadingStatus, errorMessage} = useHttp();

	const login = useCallback(async (loginRequest: LoginRequest): Promise<LoginResponse> => {

		const response: LoginResponse = await sendRequest({
			url: '/auth/login',
			method: 'POST',
			body: JSON.stringify(loginRequest),
			onError: (status): ErrorMessage => {
				if (status == 404) {
					return ErrorMessage.INVALID_CREDENTIALS;
				}
				return ErrorMessage.UNKNOWN_ERROR;
			}
		});
		if (!response) {
			throw new Error("Login failed");
		}
		return response;
	}, [sendRequest]);

	const createUser = useCallback(async (createUserRequest: CreateUserRequest, role: UserRole): Promise<void> => {

		let url = '/auth/register';
		if (role === 'INVESTOR') {
			url += '/investor';
		} else if (role === 'FREELANCER') {
			url += '/freelancer';
		}
		const response: CreateUserResponse = await sendRequest({
			url,
			method: 'POST',
			body: JSON.stringify(createUserRequest),
			onError: (status): ErrorMessage => {
				if (status == 409) {
					return ErrorMessage.USER_ALREADY_EXISTS;
				}
				return ErrorMessage.UNKNOWN_ERROR;
			}
		});
		if (!response) {
			throw new Error("Registration failed");
		}
	}, [sendRequest]);

	const fetchLoggedUserData = useCallback(async (role: string): Promise<LoggedUserResponse> => {
		const url = role === 'FREELANCER' ? '/freelancer/me' : '/investor/me';
		const response: LoggedUserResponse = await sendRequest({
			url,
			onError: (status): ErrorMessage => {
				if (status == 404) {
					return ErrorMessage.SERVER_ERROR;
				}
				return ErrorMessage.UNKNOWN_ERROR;
			}
		})
		if (!response) {
			throw new Error("Failed to fetch logged user data");
		}
		return response;
	}, [sendRequest]);

	return {loadingStatus, errorMessage, login, createUser, fetchLoggedUserData};
};



