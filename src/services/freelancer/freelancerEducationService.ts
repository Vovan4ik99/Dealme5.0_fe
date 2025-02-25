import { useHttp } from "../../hooks/http.hook.ts";
import { useCallback } from "react";
import { IFreelancerEducation, IFreelancerEducationRequest } from "@shared/freelancer/education.ts";
import { API_ROUTES } from "@constants/apiRoutes.ts";

export const useFreelancerEducationService = () => {

	const { loadingStatus, errorMessage, sendRequest } = useHttp();

	const getEducations = useCallback(async (freelancerId: number): Promise<IFreelancerEducation[]> => {
		return sendRequest({
			url: `${ API_ROUTES.PROFILE.FREELANCER.EDUCATION }/${ freelancerId }`,
		});
	}, [ sendRequest ]);

	const addEducation = useCallback(async (request: IFreelancerEducationRequest): Promise<void> => {
		return sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.EDUCATION,
			method: "POST",
			body: JSON.stringify(request),
		});
	}, [ sendRequest ]);

	const patchEducation = useCallback(async (educationId: number, request: IFreelancerEducationRequest): Promise<void> => {
		return sendRequest({
			url: `${ API_ROUTES.PROFILE.FREELANCER.EDUCATION }/${ educationId }`,
			method: "PATCH",
			body: JSON.stringify(request),
		});
	}, [ sendRequest ]);

	const deleteEducation = useCallback(async (educationId: number): Promise<void> => {
		return sendRequest({
			url: `${ API_ROUTES.PROFILE.FREELANCER.EDUCATION }/${ educationId }`,
			method: "DELETE",
		});
	}, [ sendRequest ]);

	return {
		getEducations,
		addEducation,
		patchEducation,
		deleteEducation,
		loadingStatus,
		errorMessage,
		sendRequest
	};
};