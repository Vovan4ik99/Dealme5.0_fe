export interface IFreelancerPortfolio {
	id: number;
	title: string;
	pictureData: string;
	info: string;
}

export type IFreelancerPortfolioUpdateRequest = Omit<IFreelancerPortfolio, "pictureData">;