import { useHttp } from "../hooks/http.hook";
import { useCallback } from "react";
import { API_ROUTES } from "@constants/apiRoutes.ts";
import { IFreelancerBackgroundResponse } from "@shared/freelancerTypes";

export const useFreelancerProfileService = () => {
  const { sendRequest, loadingStatus, errorMessage } = useHttp();

  const getBackgroundPicture = useCallback(async (): Promise<IFreelancerBackgroundResponse> => {
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


  const getAvatar = useCallback(async (): Promise<void> => {
    return await sendRequest({
      url: API_ROUTES.PROFILE.FREELANCER.AVATAR,
    });
  }, [sendRequest]);

  const patchAvatar = useCallback(async (request: { pictureId: number; picture: string[] }): Promise<void> => {
    return await sendRequest({
      url: API_ROUTES.PROFILE.FREELANCER.AVATAR,
      method: "PATCH",
      body: JSON.stringify(request),
    });
  }, [sendRequest]);

  const deleteAvatar = useCallback(async (): Promise<void> => {
    return await sendRequest({
      url: API_ROUTES.PROFILE.FREELANCER.AVATAR,
      method: "DELETE",
    });
  }, [sendRequest]);

  const getFreelancerBar = useCallback(async (): Promise<any> => {
    return await sendRequest({
      url: API_ROUTES.PROFILE.FREELANCER.INFO,
    });
  }, [sendRequest]);

  return {
    loadingStatus,
    errorMessage,
    getBackgroundPicture,
    patchBackgroundPicture,
    deleteBackgroundPicture,
    getAvatar,
    patchAvatar,
    deleteAvatar,
    getFreelancerBar,
  };
};