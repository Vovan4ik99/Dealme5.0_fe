import {useHttp} from "../hooks/http.hook.ts";
import {API_ROUTES} from "@constants/apiRoutes.ts";
import {IFreelancerAvatarResponse} from "@shared/freelancerTypes.ts";
import {useCallback} from "react";

export const useFreelancerService = () => {
	const {sendRequest, loadingStatus, errorMessage} = useHttp();

	const getAvatar = useCallback(async (): Promise<IFreelancerAvatarResponse> => {
		return await sendRequest({
			url: API_ROUTES.FREELANCER.GET_AVATAR,
		});
	}, [sendRequest]);

	return {loadingStatus, errorMessage, getAvatar};
}