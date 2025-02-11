import { useHttp } from "../hooks/http.hook.ts";
import { useCallback } from "react";
import { API_ROUTES } from "@constants/apiRoutes.ts";
import { IFreelancerWorkExperience, IFreelancerWorkExperienceRequest } from "@shared/freelancerTypes.ts";

export const useFreelancerWorkExperienceService = () => {
	const {sendRequest, loadingStatus, errorMessage} = useHttp();

	const getFreelancerWorkExperience = useCallback(
		async (freelancerId: number): Promise<IFreelancerWorkExperience[]> => {
		return sendRequest({
			url: `${API_ROUTES.PROFILE.FREELANCER.WORK_EXPERIENCE}/${freelancerId}`,
		});
	}, [sendRequest]);

	const addWorkExperience = useCallback(async (request: IFreelancerWorkExperienceRequest): Promise<void> => {
		return sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.WORK_EXPERIENCE,
			method: "POST",
			body: JSON.stringify(request),
		});
	}, [sendRequest]);

	const deleteWorkExperience = useCallback(async (id: number): Promise<void> => {
		return sendRequest({
			url: `${API_ROUTES.PROFILE.FREELANCER.WORK_EXPERIENCE}/${id}`,
			method: "DELETE",
		});
	}, [sendRequest]);

	const patchWorkExperience = useCallback(async (id: number, request: IFreelancerWorkExperienceRequest): Promise<void> => {
		return sendRequest({
			url: `${API_ROUTES.PROFILE.FREELANCER.WORK_EXPERIENCE}/${id}`,
			method: "PATCH",
			body: JSON.stringify(request),
		});
	}, [sendRequest]);

	return {
		addWorkExperience,
		deleteWorkExperience,
		patchWorkExperience,
		getFreelancerWorkExperience,
		loadingStatus,
		errorMessage,
	}
}