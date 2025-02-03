import { useCallback } from "react";
import { IFreelancerCertificate } from "@shared/freelancerTypes.ts";
import { API_ROUTES } from "@constants/apiRoutes.ts";
import { useHttp } from "../hooks/http.hook.ts";

export const useFreelancerCertificateService = () => {
	const {sendRequest, loadingStatus, errorMessage} = useHttp();

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
		getFreelancerCertificates,
		addCertificate,
		deleteCertificate,
		patchCertificate,
	}
}