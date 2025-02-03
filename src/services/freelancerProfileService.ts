import {useHttp} from "../hooks/http.hook";
import {useCallback} from "react";
import {API_ROUTES} from "@constants/apiRoutes.ts";
import {
	IAboutMeInfo,
	IFreelancerBackgroundResponse,
} from "@shared/freelancerTypes";

export const useFreelancerProfileService = () => {
	const {sendRequest, loadingStatus, errorMessage} = useHttp();

	const getBackgroundPicture = useCallback(async (): Promise<IFreelancerBackgroundResponse | null> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.BACKGROUND_PICTURE,
		});
	}, [sendRequest]);

	const patchBackgroundPicture = useCallback(async (formData: FormData): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.BACKGROUND_PICTURE,
			method: "PATCH",
			body: formData,
		});
	}, [sendRequest]);

	const deleteBackgroundPicture = useCallback(async (): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.BACKGROUND_PICTURE,
			method: "DELETE",
		});
	}, [sendRequest]);

	const getFreelancerProfileProgress = useCallback(async (): Promise<number> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.GET_PROFILE_PROGRESS,
		});
	}, [sendRequest]);

	const getAboutMeProfileInfo = useCallback(async (): Promise<IAboutMeInfo> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.GET_ABOUT_ME_INFO,
		})
	}, [sendRequest]);

	const patchAboutMeProfileInfo = useCallback(async (formData: FormData): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.PATCH_ABOUT_ME_INFO,
			method: "PATCH",
			body: formData,
		})
	}, [sendRequest]);

	return {
		loadingStatus,
		errorMessage,
		getBackgroundPicture,
		patchBackgroundPicture,
		deleteBackgroundPicture,
		getFreelancerProfileProgress,
		getAboutMeProfileInfo,
		patchAboutMeProfileInfo,
	};
};