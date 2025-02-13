import { WORKING_AREAS } from "@constants/workingAreas.ts";

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