import {WORKING_AREAS} from "@constants/workingAreas.ts";
import {LANGUAGE_NAMES} from "@constants/language.ts";

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

export interface IFreelancerLocalization {
	country: string;
	state: string;
	city?: string;
}

export interface IFreelancerCountry {
	name: string;
	description: string;
}

export interface IFreelancerState {
	state: string;
	description: string;
}

export interface IFreelancerWorkingArea {
	workingArea: keyof typeof WORKING_AREAS;
	workingAreaValue: string;
}

export interface IFreelancerLanguage {
	language: keyof typeof LANGUAGE_NAMES;
	level: number;
}

export interface ILanguage {
	name: string;
}