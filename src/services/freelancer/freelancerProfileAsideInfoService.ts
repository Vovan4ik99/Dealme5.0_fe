import { useHttp } from "@hooks/http.hook.ts";
import { useCallback } from "react";
import { API_ROUTES } from "@constants/apiRoutes.ts";
import { IFreelancerBarResponse, IFreelancerNameRequest } from "@shared/freelancer/common.ts";
import {
	IFreelancerCountry,
	IFreelancerLocalization,
	IFreelancerState,
	IFreelancerWorkingArea
} from "@shared/freelancer/localization.ts";
import { IFreelancerLanguage, ILanguage } from "@shared/freelancer/language.ts";
import { ILoggedUserResponse } from "@shared/userTypes.ts";

export const useFreelancerProfileAsideInfoService = () => {
	const { sendRequest, loadingStatus, errorMessage } = useHttp();

	const getFreelancerData = useCallback(async (freelancerId: number): Promise<ILoggedUserResponse> => {
		return await sendRequest({
			url: `${ API_ROUTES.USER.FREELANCER_PROFILE }/${ freelancerId }`,
		})
	}, [ sendRequest ]);

	const getFreelancerBar = useCallback(async (freelancerId: number): Promise<IFreelancerBarResponse> => {
		return await sendRequest({
			url: `${ API_ROUTES.PROFILE.FREELANCER.INFO }/${ freelancerId }`,
		});
	}, [ sendRequest ]);

	const patchFreelancerName = useCallback(async (request: IFreelancerNameRequest): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.PATCH_NAME,
			method: "PATCH",
			body: JSON.stringify(request),
		});
	}, [ sendRequest ]);

	const patchFreelancerCompany = useCallback(async (request: string): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.PATCH_COMPANY,
			method: "PATCH",
			body: request,
		});
	}, [ sendRequest ]);

	const patchFreelancerLocalization = useCallback(async (request: IFreelancerLocalization): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.PATCH_LOCALIZATION,
			method: "PATCH",
			body: JSON.stringify(request),
		})
	}, [ sendRequest ]);

	const getCountries = useCallback(async (): Promise<IFreelancerCountry[]> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.GET_COUNTRIES
		})
	}, [ sendRequest ]);

	const getStates = useCallback(async (): Promise<IFreelancerState[]> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.GET_STATES
		})
	}, [ sendRequest ]);

	const patchFreelancerWorkingArea = useCallback(async (request: IFreelancerWorkingArea) => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.PATCH_WORKING_AREA,
			method: "PATCH",
			body: JSON.stringify(request)
		});
	}, [ sendRequest ]);

	const getLanguages = useCallback(async (): Promise<ILanguage[]> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.GET_LANGUAGES
		});
	}, [ sendRequest ]);

	const patchFreelancerLanguages = useCallback(async (request: IFreelancerLanguage[]): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.GET_LANGUAGES,
			method: "PATCH",
			body: JSON.stringify(request)
		});
	}, [ sendRequest ]);

	return {
		loadingStatus,
		errorMessage,
		getFreelancerData,
		getFreelancerBar,
		patchFreelancerName,
		patchFreelancerCompany,
		patchFreelancerLocalization,
		getCountries,
		getStates,
		patchFreelancerWorkingArea,
		getLanguages,
		patchFreelancerLanguages,
	}
}