import { useHttp } from "@hooks/http.hook.ts";
import { useCallback } from "react";
import {
	ICreateUserRequest,
	ICreateUserResponse,
	UserRole
} from "@shared/userTypes.ts";
import { ILoginRequest, ILoginResponse } from "@shared/authTypes.ts";
import { API_ROUTES } from "@constants/apiRoutes.ts";
import { IFreelancerData } from "@shared/freelancer/common.ts";

export const useAuthService = () => {
	const { sendRequest, loadingStatus, errorMessage } = useHttp();

	const login = useCallback(async (loginRequest: ILoginRequest): Promise<ILoginResponse> => {

		return await sendRequest({
			url: API_ROUTES.AUTH.LOGIN,
			method: 'POST',
			body: JSON.stringify(loginRequest),
		});
	}, [ sendRequest ]);

	const createUser = useCallback(async (createUserRequest: ICreateUserRequest, role: UserRole): Promise<ICreateUserResponse> => {

		const url = role === 'INVESTOR' ?
			API_ROUTES.AUTH.REGISTER_INVESTOR : API_ROUTES.AUTH.REGISTER_FREELANCER;

		return await sendRequest({
			url,
			method: 'POST',
			body: JSON.stringify(createUserRequest),
		});
	}, [ sendRequest ]);

	const fetchLoggedUserData = useCallback(async (role: string): Promise<IFreelancerData> => {
		const url = role === 'FREELANCER'
			? API_ROUTES.USER.FREELANCER_PROFILE
			: API_ROUTES.USER.INVESTOR_PROFILE;
		return await sendRequest({
			url,
		})
	}, [ sendRequest ]);

	const resetPassword = useCallback(async (email: string): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.TOKEN.PASSWORD_RESET,
			method: "POST",
			body: email,
		})
	}, [ sendRequest ])


	return {
		loadingStatus,
		errorMessage,
		login,
		createUser,
		fetchLoggedUserData,
		resetPassword
	};
};



