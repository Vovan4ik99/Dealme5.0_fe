import { useHttp } from "@hooks/http.hook.ts";
import { useCallback } from "react";
import { IActivityDestiny, IOrganizationStage } from "@shared/onboarding/investorOnboardingTypes.ts";
import { API_ROUTES } from "@constants/apiRoutes.ts";

export const useInvestorOnboardingService = () => {

	const { sendRequest, loadingStatus, errorMessage } = useHttp();

	const getActivities = useCallback(async (): Promise<IActivityDestiny[]> => {
		return sendRequest({
			url: API_ROUTES.ONBOARDING.INVESTOR.GET_ACTIVITIES
		});
	}, [ sendRequest ]);

	const patchActivity = useCallback(
		async (activityName: string): Promise<void> => {

			return sendRequest({
				url: API_ROUTES.ONBOARDING.INVESTOR.PATCH_ACTIVITIES,
				method: "PATCH",
				body: activityName,
			});
		}, [ sendRequest ]);

	const getOrganizationStages = useCallback(async (): Promise<IOrganizationStage[]> => {
		return sendRequest({
			url: API_ROUTES.ONBOARDING.INVESTOR.GET_ORGANIZATION_STAGE
		});
	}, [ sendRequest ]);

	const patchOrganizationStage = useCallback(
		async (stageName: string): Promise<void> => {

			return sendRequest({
				url: API_ROUTES.ONBOARDING.INVESTOR.PATCH_ORGANIZATION_STAGE,
				method: "PATCH",
				body: stageName,
			});
		}, [ sendRequest ]);

	const patchSalesDepartment = useCallback(
		async (hasSalesDepartment: boolean): Promise<void> => {

			return sendRequest({
				url: API_ROUTES.ONBOARDING.INVESTOR.PATCH_SALES_DEPARTMENT,
				method: "PATCH",
				body: JSON.stringify(hasSalesDepartment),
			});
		}, [ sendRequest ]);

	const patchCompanyMails = useCallback(
		async (concatenatedMails: string): Promise<void> => {

			return sendRequest({
				url: API_ROUTES.ONBOARDING.INVESTOR.PATCH_COMPANY_MAILS,
				method: "PATCH",
				body: concatenatedMails,
			});
		}, [ sendRequest ]);

	return {
		loadingStatus,
		errorMessage,
		getActivities,
		patchActivity,
		getOrganizationStages,
		patchOrganizationStage,
		patchSalesDepartment,
		patchCompanyMails,
	}
};