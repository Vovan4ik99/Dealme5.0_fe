import { useHttp } from "@hooks/http.hook.ts";
import { useCallback } from "react";
import {
	IActivityDestiny,
	IBusinessType,
	IEmployeeCountRange,
	IGoToMarketStrategy,
	IInvestorRole,
	IOrganizationStage
} from "@shared/onboarding/investorOnboardingTypes.ts";
import { API_ROUTES } from "@constants/apiRoutes.ts";

export const useInvestorOnboardingService = () => {

	const { sendRequest, loadingStatus, errorMessage } = useHttp();

	const getActivities = useCallback(async (): Promise<IActivityDestiny[]> => {
		return await sendRequest({
			url: API_ROUTES.ONBOARDING.INVESTOR.GET_ACTIVITIES
		});
	}, [ sendRequest ]);

	const patchActivity = useCallback(
		async (activityName: string): Promise<void> => {

			return await sendRequest({
				url: API_ROUTES.ONBOARDING.INVESTOR.PATCH_ACTIVITIES,
				method: "PATCH",
				body: activityName,
			});
		}, [ sendRequest ]);

	const getOrganizationStages = useCallback(async (): Promise<IOrganizationStage[]> => {
		return await sendRequest({
			url: API_ROUTES.ONBOARDING.INVESTOR.GET_ORGANIZATION_STAGE
		});
	}, [ sendRequest ]);

	const patchOrganizationStage = useCallback(
		async (stageName: string): Promise<void> => {

			return await sendRequest({
				url: API_ROUTES.ONBOARDING.INVESTOR.PATCH_ORGANIZATION_STAGE,
				method: "PATCH",
				body: stageName,
			});
		}, [ sendRequest ]);

	const patchSalesDepartment = useCallback(
		async (hasSalesDepartment: boolean): Promise<void> => {

			return await sendRequest({
				url: API_ROUTES.ONBOARDING.INVESTOR.PATCH_SALES_DEPARTMENT,
				method: "PATCH",
				body: JSON.stringify(hasSalesDepartment),
			});
		}, [ sendRequest ]);

	const patchCompanyMails = useCallback(
		async (concatenatedMails: string): Promise<void> => {

			return await sendRequest({
				url: API_ROUTES.ONBOARDING.INVESTOR.PATCH_COMPANY_MAILS,
				method: "PATCH",
				body: concatenatedMails,
			});
		}, [ sendRequest ]);

	const getGoToMarketStrategies = useCallback(
		async (): Promise<IGoToMarketStrategy[]> => {

			return await sendRequest({
				url: API_ROUTES.ONBOARDING.INVESTOR.GET_GO_TO_MARKET_STRATEGY
			});
		}, [ sendRequest ]);

	const patchGoToMarketStrategy = useCallback(
		async (goToMarketStrategy: string): Promise<void> => {

			return await sendRequest({
				url: API_ROUTES.ONBOARDING.INVESTOR.PATCH_GO_TO_MARKET_STRATEGY,
				method: "PATCH",
				body: goToMarketStrategy,
			});
		}, [ sendRequest ]);

	const getBusinessTypes = useCallback(async (): Promise<IBusinessType[]> => {
		return await sendRequest({
			url: API_ROUTES.ONBOARDING.INVESTOR.GET_BUSINESS_TYPES
		});
	}, [ sendRequest ]);

	const patchBusinessType = useCallback(
		async (businessType: string): Promise<void> => {

			return await sendRequest({
				url: API_ROUTES.ONBOARDING.INVESTOR.PATCH_BUSINESS_TYPE,
				method: "PATCH",
				body: businessType,
			});
		}, [ sendRequest ]);

	const getInvestorRoles = useCallback(async (): Promise<IInvestorRole[]> => {
		return await sendRequest({
			url: API_ROUTES.ONBOARDING.INVESTOR.GET_INVESTOR_ROLES
		});
	}, [ sendRequest ]);

	const patchInvestorRole = useCallback(
		async (role: string): Promise<void> => {

			return await sendRequest({
				url: API_ROUTES.ONBOARDING.INVESTOR.PATCH_INVESTOR_ROLE,
				method: "PATCH",
				body: role,
			});
		}, [ sendRequest ]);

	const getEmployeeCountRanges = useCallback(
		async (): Promise<IEmployeeCountRange[]> => {

			return await sendRequest({
				url: API_ROUTES.ONBOARDING.INVESTOR.GET_EMPLOYEE_COUNT_RANGES
			});
		}, [ sendRequest ]);

	const patchEmployeeCountRange = useCallback(
		async (employeeCountRange: string): Promise<void> => {

			return await sendRequest({
				url: API_ROUTES.ONBOARDING.INVESTOR.PATCH_EMPLOYEE_COUNT_RANGE,
				method: "PATCH",
				body: employeeCountRange,
			});
		}, [ sendRequest ]);

	const patchCompanyUrl = useCallback(
		async (companySiteUrl: string): Promise<void> => {

			return await sendRequest({
				url: API_ROUTES.ONBOARDING.INVESTOR.PATCH_COMPANY_URL,
				method: "PATCH",
				body: companySiteUrl,
			});
		}, [ sendRequest ]);

	const patchCompanyDescription = useCallback(
		async (companyDescription: string): Promise<void> => {

			return await sendRequest({
				url: API_ROUTES.ONBOARDING.INVESTOR.PATCH_COMPANY_DESCRIPTION,
				method: "PATCH",
				body: companyDescription,
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
		getGoToMarketStrategies,
		patchGoToMarketStrategy,
		getBusinessTypes,
		patchBusinessType,
		getInvestorRoles,
		patchInvestorRole,
		getEmployeeCountRanges,
		patchEmployeeCountRange,
		patchCompanyUrl,
		patchCompanyDescription,
	};
};