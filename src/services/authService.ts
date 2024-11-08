import {useHttp} from "../hooks/http.hook.ts";
import {useCallback} from "react";
import {jwtDecode} from "jwt-decode";
import {LoginData, UserDataResponse} from "../components/LoginForm/loginFormTypes.ts";
import {ErrorMessage} from "../constans/ErrorMessage.ts";
import {CreateUserData, UserRole} from "../components/RegistrationForm/registrationFormTypes.ts";

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';

interface AuthResponse {
	token: string;
}

interface DecodedToken {
	sub: string;
	roles: string[];
}

interface CreateUserResponse {
	email: string;
	firstName: string;
	lastName: string;
	company: string;
	phone: string;
}

export const useAuthService = () => {
	const {sendRequest, loadingStatus, errorMessage} = useHttp();

	const login = useCallback(async (loginData: LoginData): Promise<UserDataResponse> => {

		const response: AuthResponse = await sendRequest({
			url: `${baseUrl}/auth/login`,
			method: 'POST',
			body: JSON.stringify(loginData),
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
		localStorage.setItem('token', response.token);
		const {sub, roles} = jwtDecode<DecodedToken>(response.token);
		return {
			username: sub,
			roles
		};
	}, [sendRequest]);

	const createUser = useCallback(async (createUserData: CreateUserData, role: UserRole): Promise<void> => {

		let url = `${baseUrl}/auth/register`;
		if (role === 'INVESTOR') {
			url += '/investor';
		} else if (role === 'FREELANCER') {
			url += '/freelancer';
		}
		const response: CreateUserResponse = await sendRequest({
			url,
			method: 'POST',
			body: JSON.stringify(createUserData),
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
	}, [sendRequest])

	return {loadingStatus, errorMessage, login, createUser};
};



