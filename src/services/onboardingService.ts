import {useHttp} from "../hooks/http.hook.ts";
import {useCallback} from "react";
import {API_ROUTES} from "../constans/apiRoutes.ts";
import {ExperienceLevelKey} from "../constans/experienceLevel.ts";
import {ISpecialization} from "../shared/onboardingTypes.ts";

export const useOnboardingService = () => {
	const {sendRequest, loadingStatus, errorMessage} = useHttp();

	const patchExperienceLevel = useCallback(async (experienceLevel: ExperienceLevelKey): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.ONBOARDING.FREELANCER.PATCH_EXPERIENCE_LEVEL,
			method: 'PATCH',
			body: experienceLevel,
		});
	}, [sendRequest]);

	const getSpecializations = useCallback(async (): Promise<ISpecialization[]> => {
		return await sendRequest({
			url: API_ROUTES.ONBOARDING.FREELANCER.SPECIALIZATION
		});
	}, [sendRequest]);

	const patchSpecialization = useCallback(async (id: number, request: Omit<ISpecialization, 'id'>): Promise<void> => {
		return await sendRequest({
			url: `${API_ROUTES.ONBOARDING.FREELANCER.SPECIALIZATION}/${id}`,
			method: 'PATCH',
			body: JSON.stringify(request)
		})
	}, [sendRequest]);

	return {loadingStatus, errorMessage, patchExperienceLevel, getSpecializations, patchSpecialization};
}