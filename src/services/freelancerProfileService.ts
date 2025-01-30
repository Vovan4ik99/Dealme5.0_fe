import {useHttp} from "../hooks/http.hook";
import {useCallback} from "react";
import {API_ROUTES} from "@constants/apiRoutes.ts";
import {
	IAboutMeInfo,
	IFreelancerBackgroundResponse,
	IFreelancerCertificate
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

	const getFreelancerCertificates = useCallback(async (): Promise<IFreelancerCertificate[]> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.GET_FREELANCER_CERTIFICATES
		})
	}, [sendRequest]);

	const addCertificate = useCallback(async (request: Omit<IFreelancerCertificate, 'id'>): Promise<IFreelancerCertificate> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.ADD_FREELANCER_CERTIFICATE,
			method: "POST",
			body: JSON.stringify(request)
		})
	}, [sendRequest]);

	const deleteCertificate = useCallback(async (id: number): Promise<void> => {
		return await sendRequest({
			url: `${API_ROUTES.PROFILE.FREELANCER.ADD_FREELANCER_CERTIFICATE}/${id}`,
			method: "DELETE"
		});
	}, [sendRequest]);

	const patchCertificate = useCallback(async (id: number, request: Omit<IFreelancerCertificate, 'id'>): Promise<void> => {
		return await sendRequest({
			url: `${API_ROUTES.PROFILE.FREELANCER.ADD_FREELANCER_CERTIFICATE}/${id}`,
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
		getFreelancerProfileProgress,
		getAboutMeProfileInfo,
		patchAboutMeProfileInfo,
		getFreelancerCertificates,
		addCertificate,
		deleteCertificate,
		patchCertificate
	};
};