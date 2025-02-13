import { REVIEW_CATEGORIES } from "@constants/reviewCategories.ts";

interface IFreelancerReviewCategory {
	id: number;
	category: keyof typeof REVIEW_CATEGORIES;
	score: number;
}

export interface IFreelancerReview {
	id: number;
	score: number;
	date: string;
	authorFirstName: string;
	authorLastName: string;
	categoryOpinions: IFreelancerReviewCategory[];
}