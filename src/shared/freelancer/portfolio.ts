export interface IFreelancerPortfolio {
	pictureId: number;
	title: string;
	pictureData: string;
	info: string;
}

export type IFreelancerPortfolioUpdateRequest = Omit<IFreelancerPortfolio, "pictureData">;