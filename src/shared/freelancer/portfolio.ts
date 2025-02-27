export interface IFreelancerPortfolio {
	id: number;
	title: string;
	pictureData: string;
	info: string;
}

export type IFreelancerPortfolioCreateRequest = Omit<IFreelancerPortfolio, "id">;

export type IFreelancerPortfolioUpdateRequest = Omit<IFreelancerPortfolio, "pictureData">;