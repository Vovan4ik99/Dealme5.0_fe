import { IFreelancerLocalization } from "@shared/freelancer/localization.ts";

export interface IFreelancerWorkExperience extends IFreelancerLocalization {
	id: number;
	companyName: string;
	jobTitle: string;
	startDate: string;
	endDate?: string | null;
	city: string;
}

export type IFreelancerWorkExperienceRequest = Omit<IFreelancerWorkExperience, "id">;