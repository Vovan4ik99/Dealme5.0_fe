import { IFreelancerLanguage } from "@shared/freelancer/language.ts";

export interface ILanguageModalItemProps {
	language: string;
	description: string;
	level: number;
	onDelete: () => void;
	updateLevel: (level: number) => void;
}

export interface IFreelancerDraggableLanguage extends IFreelancerLanguage {
	id: string;
}