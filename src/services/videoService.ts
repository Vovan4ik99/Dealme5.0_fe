import { useHttp } from "../hooks/http.hook.ts";
import { useCallback } from "react";
import { API_ROUTES } from "@constants/apiRoutes.ts";
import { IFreelancerVideo, IPatchVideoRequest } from "@shared/freelancer/video.ts";

export const useVideoService = () => {
	const {sendRequest, loadingStatus, errorMessage} = useHttp();

	const getFreelancerVideos = useCallback(async (freelancerId: number): Promise<IFreelancerVideo[]> => {
		return await sendRequest({
			url: `${API_ROUTES.PROFILE.FREELANCER.GET_VIDEO}/${freelancerId}`,
		});
	}, [sendRequest]);

	const addFreelancerVideo = useCallback(async (request: FormData): Promise<IFreelancerVideo> => {
		return await sendRequest({
			url: API_ROUTES.PROFILE.FREELANCER.ADD_VIDEO,
			method: "POST",
			body: request,
		});
	}, [sendRequest]);

	const patchFreelancerVideo = useCallback(
		async (videoId: number, request: IPatchVideoRequest): Promise<void> => {

			return await sendRequest({
				url: `${API_ROUTES.PROFILE.FREELANCER.ADD_VIDEO}/${videoId}`,
				method: "PATCH",
				body: JSON.stringify(request),
			});
		}, [sendRequest]);

	const deleteFreelancerVideo = useCallback(async (videoId: number): Promise<void> => {
		return await sendRequest({
			url: `${API_ROUTES.PROFILE.FREELANCER.ADD_VIDEO}/${videoId}`,
			method: "DELETE",
		});
	}, [sendRequest]);

	return {
		loadingStatus,
		errorMessage,
		getFreelancerVideos,
		addFreelancerVideo,
		patchFreelancerVideo,
		deleteFreelancerVideo,
	}
};