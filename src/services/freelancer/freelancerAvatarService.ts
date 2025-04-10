import { useHttp } from "@hooks/http.hook.ts";
import { useCallback } from "react";
import { IFreelancerAvatarResponse } from "@shared/userTypes.ts";
import { API_ROUTES } from "@constants/apiRoutes.ts";

export const useFreelancerAvatarService = () => {
	const { sendRequest, loadingStatus, errorMessage } = useHttp();

	const getAvatar = useCallback(async (freelancerId: number): Promise<IFreelancerAvatarResponse> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.AVATAR + `/${ freelancerId }`
		});
	}, [ sendRequest ]);

	const patchAvatar = useCallback(async (formData: FormData): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.AVATAR,
			method: "PATCH",
			body: formData,
		});
	}, [ sendRequest ]);

	const deleteAvatar = useCallback(async (): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.AVATAR,
			method: "DELETE",
		});
	}, [ sendRequest ]);

	return {
		loadingStatus,
		errorMessage,
		getAvatar,
		patchAvatar,
		deleteAvatar
	};
}