import { useHttp } from "@hooks/http.hook.ts";
import { useCallback } from "react";
import { API_ROUTES } from "@constants/apiRoutes.ts";
import { IAboutMeInfo, IFreelancerBackgroundResponse, IFreelancerData } from "@shared/freelancer/common.ts";
import { IFreelancerReview } from "@shared/freelancer/review.ts";
import { ISalesTool } from "@shared/onboardingTypes.ts";
import { IActivityRequest, IFreelancerActivity } from "@shared/onboardingTypes.ts";

export const useFreelancerProfileService = () => {
	const { sendRequest, loadingStatus, errorMessage } = useHttp();

	const getBackgroundPicture = useCallback(
		async (freelancerId: number): Promise<IFreelancerBackgroundResponse | null> => {

			return await sendRequest({
				url: `${ API_ROUTES.PROFILE.FREELANCER.BACKGROUND_PICTURE }/${ freelancerId }`,
			});
		}, [ sendRequest ]);

	const patchBackgroundPicture = useCallback(async (formData: FormData): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.BACKGROUND_PICTURE,
			method: "PATCH",
			body: formData,
		});
	}, [ sendRequest ]);

	const deleteBackgroundPicture = useCallback(async (): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.BACKGROUND_PICTURE,
			method: "DELETE",
		});
	}, [ sendRequest ]);

	const getFreelancerProfileProgress = useCallback(async (): Promise<number> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.GET_PROFILE_PROGRESS,
		});
	}, [ sendRequest ]);

	const getAboutMeProfileInfo = useCallback(async (freelancerId: number): Promise<IAboutMeInfo> => {
		return await sendRequest({
			url: `${ API_ROUTES.PROFILE.FREELANCER.GET_ABOUT_ME_INFO }/${ freelancerId }`,
		});
	}, [ sendRequest ]);

	const patchAboutMeProfileInfo = useCallback(async (formData: FormData): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.PATCH_ABOUT_ME_INFO,
			method: "PATCH",
			body: formData,
		});
	}, [ sendRequest ]);

	const getFreelancerReviews = useCallback(
		async (freelancerId: number): Promise<IFreelancerReview[]> => {

			return await sendRequest({
				url: `${ API_ROUTES.PROFILE.FREELANCER.GET_REVIEWS }/${ freelancerId }`
			});
		}, [ sendRequest ]);

	const getFreelancerPrimaryInfo = useCallback(async (freelancerId: number): Promise<IFreelancerData> => {
		return await sendRequest({
			url: `${ API_ROUTES.USER.FREELANCER_PROFILE }/${ freelancerId }`
		});
	}, [ sendRequest ]);

	const getFreelancerActivities = useCallback(
		async (freelancerId: number): Promise<IFreelancerActivity[]> => {

			return await sendRequest({
				url: `${ API_ROUTES.PROFILE.FREELANCER.GET_ACTIVITIES }/${ freelancerId }`,
			})
		}, [ sendRequest ]);

	const getFreelancerSalesTools = useCallback(async (freelancerId: number): Promise<ISalesTool[]> => {
		return await sendRequest({
			url: `${ API_ROUTES.ONBOARDING.FREELANCER.FREELANCER_SALES_TOOLS }/${ freelancerId }`,
		});
	}, [ sendRequest ]);

	const createActivity = useCallback(async (request: IActivityRequest): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.ADD_ACTIVITY,
			method: "POST",
			body: JSON.stringify(request)
		})
	}, [ sendRequest ]);

	return {
		loadingStatus,
		errorMessage,
		getBackgroundPicture,
		patchBackgroundPicture,
		deleteBackgroundPicture,
		getFreelancerProfileProgress,
		getAboutMeProfileInfo,
		patchAboutMeProfileInfo,
		getFreelancerReviews,
		getFreelancerPrimaryInfo,
		getFreelancerActivities,
		getFreelancerSalesTools,
		createActivity
	};
};