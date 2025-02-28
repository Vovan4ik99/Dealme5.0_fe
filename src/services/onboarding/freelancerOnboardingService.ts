import { useHttp } from "@hooks/http.hook.ts";
import { useCallback } from "react";
import { API_ROUTES } from "@constants/apiRoutes.ts";
import { ExperienceLevelKey } from "@constants/experienceLevel.ts";
import {
	IActivity,
	IActivityRequest,
	IIncomeGoal,
	IIndustry,
	ISalesTool,
	ISector,
	ISpecialization,
	ITypeOfSale,
	IWorkingHour
} from "@shared/onboardingTypes.ts";
import { WorkingDayKey } from "@constants/workingDays.ts";

export const useFreelancerOnboardingService = () => {
	const { sendRequest, loadingStatus, errorMessage } = useHttp();

	const patchExperienceLevel = useCallback(async (experienceLevel: ExperienceLevelKey): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.ONBOARDING.FREELANCER.PATCH_EXPERIENCE_LEVEL,
			method: 'PATCH',
			body: experienceLevel,
		});
	}, [ sendRequest ]);

	const getSpecializations = useCallback(async (): Promise<ISpecialization[]> => {
		return await sendRequest({
			url: API_ROUTES.ONBOARDING.FREELANCER.GET_SPECIALIZATIONS
		});
	}, [ sendRequest ]);

	const patchSpecialization = useCallback(async (freelancerId: number, specialization_id: number): Promise<void> => {
		return await sendRequest({
			url: `${ API_ROUTES.ONBOARDING.FREELANCER.PATCH_SPECIALIZATION }/${ freelancerId }`,
			method: 'PATCH',
			body: `${ specialization_id }`
		})
	}, [ sendRequest ]);

	const patchWorkingDays = useCallback(async (request: WorkingDayKey[]): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.ONBOARDING.FREELANCER.PARCH_WORKING_DAYS,
			method: 'PATCH',
			body: JSON.stringify(request)
		});
	}, [ sendRequest ]);

	const getWorkingHours = useCallback(async (): Promise<IWorkingHour[]> => {
		return await sendRequest({
			url: API_ROUTES.ONBOARDING.FREELANCER.GET_WORKING_HOURS
		});
	}, [ sendRequest ]);

	const patchWorkingHours = useCallback(async (request: string): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.ONBOARDING.FREELANCER.PATCH_WORKING_HOURS,
			method: 'PATCH',
			body: request
		});
	}, [ sendRequest ]);

	const getIncomeGoals = useCallback(async (): Promise<IIncomeGoal[]> => {
		return await sendRequest({
			url: API_ROUTES.ONBOARDING.FREELANCER.GET_INCOME_GOALS
		});
	}, [ sendRequest ]);

	const patchIncomeGoal = useCallback(async (request: string): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.ONBOARDING.FREELANCER.PATCH_INCOME_GOALS,
			method: 'PATCH',
			body: request
		});
	}, [ sendRequest ]);

	const getIndustries = useCallback(async (): Promise<IIndustry[]> => {
		return await sendRequest({
			url: API_ROUTES.ONBOARDING.FREELANCER.GET_INDUSTRIES
		});
	}, [ sendRequest ]);

	const patchSubIndustries = useCallback(async (request: number[]): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.ONBOARDING.FREELANCER.PATCH_SUB_INDUSTRIES,
			method: 'PATCH',
			body: JSON.stringify(request)
		});
	}, [ sendRequest ]);

	const getTypesOfSales = useCallback(async (): Promise<ITypeOfSale[]> => {
		return await sendRequest({
			url: API_ROUTES.ONBOARDING.FREELANCER.GET_TYPES_OF_SALES
		});
	}, [ sendRequest ]);

	const patchTypeOfSales = useCallback(async (request: string): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.ONBOARDING.FREELANCER.PATCH_TYPES_OF_SALES,
			method: 'PATCH',
			body: request
		});
	}, [ sendRequest ]);

	const getSectors = useCallback(async (): Promise<ISector[]> => {
		return await sendRequest({
			url: API_ROUTES.ONBOARDING.FREELANCER.GET_SECTORS
		});
	}, [ sendRequest ]);

	const patchSectors = useCallback(async (request: number[]): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.ONBOARDING.FREELANCER.PATCH_SECTORS,
			method: 'PATCH',
			body: JSON.stringify(request)
		});
	}, [ sendRequest ]);

	const getActivities = useCallback(async (): Promise<IActivity[]> => {
		return await sendRequest({
			url: API_ROUTES.ONBOARDING.FREELANCER.GET_ACTIVITIES,
		});
	}, [ sendRequest ]);

	const patchActivities = useCallback(async (request: IActivityRequest[]): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.ONBOARDING.FREELANCER.PATCH_ACTIVITIES,
			method: 'PATCH',
			body: JSON.stringify(request)
		});
	}, [ sendRequest ]);

	const getSalesTools = useCallback(async (freelancerId: number): Promise<ISalesTool[]> => {
		return await sendRequest({
			url: `${ API_ROUTES.ONBOARDING.FREELANCER.SALES_TOOLS }/${ freelancerId }`,
		});
	}, [ sendRequest ]);

	const patchSalesTools = useCallback(async (request: number[]): Promise<void> => {
		return await sendRequest({
			url: API_ROUTES.ONBOARDING.FREELANCER.SALES_TOOLS,
			method: 'PATCH',
			body: JSON.stringify(request)
		})
	}, [ sendRequest ]);

	return {
		loadingStatus, errorMessage, patchExperienceLevel, getSpecializations, patchSpecialization,
		patchWorkingDays, getWorkingHours, patchWorkingHours, getIncomeGoals, patchIncomeGoal, getIndustries,
		patchSubIndustries, getTypesOfSales, patchTypeOfSales, getSectors, patchSectors, getActivities,
		patchActivities, getSalesTools, patchSalesTools
	};
}