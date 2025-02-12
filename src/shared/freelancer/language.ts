import { LANGUAGE_NAMES } from "@constants/language.ts";

export interface IFreelancerLanguage {
	language: keyof typeof LANGUAGE_NAMES;
	level: number;
}

export interface ILanguage {
	name: string;
}