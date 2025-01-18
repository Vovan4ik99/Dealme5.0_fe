import {useHttp} from "../hooks/http.hook";
import {useCallback} from "react";
import {API_ROUTES} from "@constants/apiRoutes.ts";
import {
	IFreelancerBackgroundResponse,
	IFreelancerBarResponse, IFreelancerCountry, IFreelancerLanguage,
	IFreelancerLocalization,
	IFreelancerNameRequest, IFreelancerState, IFreelancerWorkingArea, ILanguage
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

	const getFreelancerBar = useCallback(async (): Promise<IFreelancerBarResponse> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.INFO,
		});
	}, [sendRequest]);

	const patchFreelancerName = useCallback(async (request: IFreelancerNameRequest): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.PATCH_NAME,
			method: "PATCH",
			body: JSON.stringify(request),
		});
	}, [sendRequest]);

	const patchFreelancerCompany = useCallback(async (request: string): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.PATCH_COMPANY,
			method: "PATCH",
			body: request,
		});
	}, [sendRequest]);

	const patchFreelancerLocalization = useCallback(async (request: IFreelancerLocalization): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.PATCH_LOCALIZATION,
			method: "PATCH",
			body: JSON.stringify(request),
		})
	}, [sendRequest]);

	const getCountries = useCallback(async (): Promise<IFreelancerCountry[]> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.GET_COUNTRIES
		})
	}, [sendRequest]);

	const getStates = useCallback(async (): Promise<IFreelancerState[]> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.GET_STATES
		})
	}, [sendRequest]);

	const patchFreelancerWorkingArea = useCallback(async (request: IFreelancerWorkingArea) => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.PATCH_WORKING_AREA,
			method: "PATCH",
			body: JSON.stringify(request)
		});
	}, [sendRequest]);

	const getLanguages = useCallback(async (): Promise<ILanguage[]> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.GET_LANGUAGES
		});
	}, [sendRequest]);

	const patchFreelancerLanguages = useCallback(async (request: IFreelancerLanguage[]): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.GET_LANGUAGES,
			method: "PATCH",
			body: JSON.stringify(request)
		});
	}, [sendRequest]);

	return {
		loadingStatus,
		errorMessage,
		getBackgroundPicture,
		patchBackgroundPicture,
		deleteBackgroundPicture,
		getFreelancerBar,
		patchFreelancerName,
		patchFreelancerCompany,
		patchFreelancerLocalization,
		getCountries,
		getStates,
		patchFreelancerWorkingArea,
		getLanguages,
		patchFreelancerLanguages
	};
};