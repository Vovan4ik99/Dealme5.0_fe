import { useHttp } from "@hooks/http.hook.ts";
import { useCallback } from "react";
import { ICreateUserRequest, ICreateUserResponse, UserRole } from "@shared/userTypes.ts";
import { IInvestorAuthTokenResponse, ILoginRequest, ILoginResponse } from "@shared/authTypes.ts";
import { API_ROUTES } from "@constants/apiRoutes.ts";
import { IFreelancerData } from "@shared/freelancer/common.ts";
import { IInvestorData } from "@shared/investor/common.ts";

export const useAuthService = () => {
	const { sendRequest, loadingStatus, errorMessage } = useHttp();

	const login = useCallback(async (loginRequest: ILoginRequest): Promise<ILoginResponse> => {

		return await sendRequest({
			url: API_ROUTES.AUTH.LOGIN,
			method: 'POST',
			body: JSON.stringify(loginRequest),
		});
	}, [ sendRequest ]);

	const createUser = useCallback(
		async (createUserRequest: ICreateUserRequest, role: UserRole): Promise<ICreateUserResponse> => {

			const url = role === 'INVESTOR' ?
				API_ROUTES.AUTH.REGISTER_INVESTOR : API_ROUTES.AUTH.REGISTER_FREELANCER;

			return await sendRequest({
				url,
				method: 'POST',
				body: JSON.stringify(createUserRequest),
			});
		}, [ sendRequest ]);

	const fetchFreelancerData = useCallback(async (): Promise<IFreelancerData> => {
		return await sendRequest({
			url: API_ROUTES.USER.FREELANCER_PROFILE,
		})
	}, [ sendRequest ]);

	const fetchInvestorData = useCallback(async (): Promise<IInvestorData> => {
		return await sendRequest({
			url: API_ROUTES.USER.INVESTOR_PROFILE,
		})
	}, [ sendRequest ]);

	const resetPassword = useCallback(async (email: string): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.TOKEN.PASSWORD_RESET,
			method: "POST",
			body: email,
		})
	}, [ sendRequest ]);

	const getInvestorAuthToken = useCallback(
		async (): Promise<IInvestorAuthTokenResponse> => {

			return await sendRequest({
				url: API_ROUTES.AUTH.GET_INVESTOR_AUTH_TOKEN,
				method: "POST",
			});
		}, [ sendRequest ]);

	return {
		loadingStatus,
		errorMessage,
		login,
		createUser,
		fetchFreelancerData,
		fetchInvestorData,
		resetPassword,
		getInvestorAuthToken,
	};
};



