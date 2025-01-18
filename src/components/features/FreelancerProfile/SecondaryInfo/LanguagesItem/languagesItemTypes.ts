import {LANGUAGE_NAMES} from "@constants/language.ts";

export interface ILanguagesItemProps {
	isUndefined: boolean;
	freelancerLanguages: (keyof typeof LANGUAGE_NAMES)[];
	onSave: () => void;
}