import {IFreelancerLanguage} from "@shared/freelancerTypes.ts";

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