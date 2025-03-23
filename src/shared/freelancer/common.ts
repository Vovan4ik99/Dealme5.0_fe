import { IFreelancerLocalization } from "@shared/freelancer/localization.ts";
import { WORKING_AREAS } from "@constants/workingAreas.ts";
import { IFreelancerLanguage } from "@shared/freelancer/language.ts";
import { EXPERIENCE_LEVELS } from "@constants/experienceLevel.ts";
import { IFreelancerActivity, ISalesTool, ISector, ISpecialization, ISubIndustry } from "@shared/onboardingTypes.ts";
import { WorkingDayKey } from "@constants/workingDays.ts";
import { IFreelancerWorkExperience } from "@shared/freelancer/work-experience.ts";
import { ILoggedUserResponse } from "@shared/userTypes.ts";

export interface IFreelancerBackgroundResponse {
	id: number;
	freelancerId: number;
	pictureData: string;
}

export interface IFreelancerBarResponse {
	visibilityStatus: "NORMAL" | "LIMITED";
	accountStatus: "NORMAL" | "LIMITED";
	rate: number;
	count: number;
	points: number;
	ordersCount: number;
	localization: IFreelancerLocalization | null;
	workingArea: keyof typeof WORKING_AREAS | null;
	workingAreaValue: string | null;
	languagesLevel: IFreelancerLanguage[];
}

export interface IFreelancerNameRequest {
	firstName: string;
	lastName: string;
}

export interface IAboutMeInfo {
	id: number;
	about: string | null;
	video: string | null;
	mainPassion: string | null;
}

export interface IFreelancerData extends ILoggedUserResponse {
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
	isOnboardingPassed: boolean;
}