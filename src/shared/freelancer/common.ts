import { IFreelancerLocalization } from "@shared/freelancer/localization.ts";
import { WORKING_AREAS } from "@constants/workingAreas.ts";
import { IFreelancerLanguage } from "@shared/freelancer/language.ts";

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