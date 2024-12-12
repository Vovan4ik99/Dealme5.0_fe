import { useHttp } from "../hooks/http.hook";
import { useCallback } from "react";
import { API_ROUTES } from "@constants/apiRoutes.ts";

export const useProfileService = () => {
  const { sendRequest, loadingStatus, errorMessage } = useHttp();

  const getBackgroundPicture = useCallback(async (): Promise<void> => {
    return await sendRequest({
      url: API_ROUTES.PROFILE.FREELANCER.GET_BACKGROUND_PICTURE,
    });
  }, [sendRequest]);

  const patchBackgroundPicture = useCallback(async (request: { id: number; freelancerId: number; pictureData: string[] }): Promise<void> => {
    return await sendRequest({
      url: API_ROUTES.PROFILE.FREELANCER.PATCH_BACKGROUND_PICTURE,
      method: "PATCH",
      body: JSON.stringify(request),
    });
  }, [sendRequest]);

  const deleteBackgroundPicture = useCallback(async (): Promise<void> => {
    return await sendRequest({
      url: API_ROUTES.PROFILE.FREELANCER.DELETE_BACKGROUND_PICTURE,
      method: "DELETE",
    });
  }, [sendRequest]);


  const getAvatar = useCallback(async (): Promise<void> => {
    return await sendRequest({
      url: API_ROUTES.PROFILE.FREELANCER.GET_AVATAR,
    });
  }, [sendRequest]);

  const patchAvatar = useCallback(async (request: { pictureId: number; picture: string[] }): Promise<void> => {
    return await sendRequest({
      url: API_ROUTES.PROFILE.FREELANCER.PATCH_AVATAR,
      method: "PATCH",
      body: JSON.stringify(request),
    });
  }, [sendRequest]);

  const deleteAvatar = useCallback(async (): Promise<void> => {
    return await sendRequest({
      url: API_ROUTES.PROFILE.FREELANCER.DELETED_AVATAR,
      method: "DELETE",
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
  };
};
