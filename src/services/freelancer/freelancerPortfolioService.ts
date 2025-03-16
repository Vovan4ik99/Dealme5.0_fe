import { useHttp } from "@hooks/http.hook.ts";
import { useCallback } from "react";
import { API_ROUTES } from "@constants/apiRoutes.ts";
import { IFreelancerPortfolio, IFreelancerPortfolioUpdateRequest } from "@shared/freelancer/portfolio.ts";

export const useFreelancerPortfolioService = () => {

	const { loadingStatus, errorMessage, sendRequest } = useHttp();

	const getPortfolioItems = useCallback(
		async (freelancerId: number): Promise<IFreelancerPortfolio[]> => {

			return sendRequest({
				url: `/freelancer/${ freelancerId }/portfolios`,
			});
		}, [ sendRequest ]);

	const addPortfolioItem = useCallback(
		async (request: FormData): Promise<void> => {

			return sendRequest({
				url: API_ROUTES.PROFILE.FREELANCER.PORTFOLIO,
				method: "POST",
				body: request,
			});
		}, [ sendRequest ]);

	const patchPortfolioItem = useCallback(
		async (request: IFreelancerPortfolioUpdateRequest): Promise<void> => {

			return sendRequest({
				url: API_ROUTES.PROFILE.FREELANCER.PORTFOLIO,
				method: "PATCH",
				body: JSON.stringify(request),
			});
		}, [ sendRequest ]);

	const deletePortfolioItem = useCallback(
		async (itemId: number): Promise<void> => {

			return sendRequest({
				url: `${ API_ROUTES.PROFILE.FREELANCER.PORTFOLIO }/${ itemId }`,
				method: "DELETE",
			});
		}, [ sendRequest ]);

	return {
		getPortfolioItems,
		addPortfolioItem,
		patchPortfolioItem,
		deletePortfolioItem,
		loadingStatus,
		errorMessage,
	};
};