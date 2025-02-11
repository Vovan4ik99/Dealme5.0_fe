import { WORKING_AREAS } from "@constants/workingAreas.ts";
import { LANGUAGE_NAMES } from "@constants/language.ts";
import { REVIEW_CATEGORIES } from "@constants/reviewCategories.ts";

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

export interface IAboutMeInfo {
	id: number;
	about: string | null;
	video: string | null;
	mainPassion: string | null;
}

export type CertificateType = 'CERTIFICATE' | 'LICENSE';

export interface IFreelancerCertificateRequest {
	name: string;
	dateOfObtaining: string;
	endDate?: string;
	certificateType: CertificateType;
	info: string;
}

export interface IFreelancerCertificate {
	id: number;
	name: string;
	dateOfObtaining: string;
	endDate: string | null;
	certificateType: CertificateType;
	info: string;
}

export interface IFreelancerVideo {
	id: number,
	fileName: string,
	fileUrl: string,
	title: string,
	description: string,
	date: string
}

export interface IPatchVideoRequest {
	title: string;
}

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

export interface IFreelancerWorkExperience extends IFreelancerLocalization {
	id: number;
	companyName: string;
	jobTitle: string;
	startDate: string;
	endDate?: string | null;
	city: string;
}

export type IFreelancerWorkExperienceRequest = Omit<IFreelancerWorkExperience, "id">;

