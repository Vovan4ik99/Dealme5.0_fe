import { IFreelancerActivity, ISalesTool, ISector, ISpecialization, ISubIndustry } from "./onboardingTypes.ts";
import { EXPERIENCE_LEVELS } from "@constants/experienceLevel.ts";
import { WorkingDayKey } from "@constants/workingDays.ts";
import { IFreelancerWorkExperience } from "@shared/freelancer/work-experience.ts";

export type UserRole = 'FREELANCER' | 'INVESTOR';

export interface ICreateUserRequest {
	firstName: string;
	lastName: string;
	company: string;
	email: string;
	password: string;
}

export interface ICreateUserResponse {
	email: string;
	firstName: string;
	lastName: string;
	company: string;
}

export interface ILoggedUserResponse {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	experienceLevel: keyof typeof EXPERIENCE_LEVELS;
	company: string;
	specialization: ISpecialization,
	workingDays: WorkingDayKey[];
	workingHours: string;
	incomeGoal: string;
	subIndustries: ISubIndustry[],
	typeOfSales: string;
	sectors: ISector[];
	selectedActivities: IFreelancerActivity[],
	salesTools: ISalesTool[];
	workExperiences: IFreelancerWorkExperience[];
}

export interface IUserAvatarResponse {
	pictureId: number;
	picture: string;
}

export interface ILoggedUserData extends ILoggedUserResponse {
	role: UserRole;
}