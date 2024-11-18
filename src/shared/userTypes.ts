import {IActivity, ISalesTool, ISector, ISpecialization, ISubIndustry} from "./onboardingTypes.ts";

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
	firstName: string;
	lastName: string;
	experienceLevel: string;
	specialization: ISpecialization,
	workingDays: string[];
	workingHours: string;
	incomeGoal: string;
	subIndustries: ISubIndustry[],
	typeOfSales: string;
	sectors: ISector[];
	selectedActivities: IActivity[],
	salesTools: ISalesTool[];
}

export interface ILoggedUserData extends ILoggedUserResponse {
	role: UserRole;
}