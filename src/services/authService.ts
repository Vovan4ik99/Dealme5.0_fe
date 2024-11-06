import {useHttp} from "../hooks/http.hook.ts";
import {useCallback} from "react";
import {jwtDecode} from "jwt-decode";
import {LoginData, UserDataResponse} from "../components/LoginPage/types.ts";
import {ErrorMessage} from "../constans/ErrorMessage.ts";

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';

interface AuthResponse {
	token: string;
}

interface DecodedToken {
	sub: string;
	roles: string[];
}

export const useAuthService = () => {
	const {sendRequest, loadingStatus, errorMessage} = useHttp<AuthResponse>();

	const login = useCallback(
		async (loginData: LoginData): Promise<UserDataResponse> => {

			const response = await sendRequest({
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

	return {loadingStatus, errorMessage, login};
};



