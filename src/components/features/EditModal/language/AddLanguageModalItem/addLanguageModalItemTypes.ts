import { ISaveableChildProps } from "@context/ModalContext/ModalContext.ts";
import { LANGUAGE_NAMES } from "@constants/language.ts";
import { IFreelancerLanguage } from "@shared/freelancerTypes.ts";

export interface IAddLanguageModalItemProps extends ISaveableChildProps {
	languages: (keyof typeof LANGUAGE_NAMES)[];
	onSave: (language: IFreelancerLanguage) => void;
}

export interface ILanguageForm {
	language: keyof typeof LANGUAGE_NAMES;
	level: number;
}