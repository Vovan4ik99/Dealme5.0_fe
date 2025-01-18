import {LANGUAGE_LEVEL_DESCRIPTIONS, LANGUAGE_LEVEL_NAMES, LANGUAGE_NAMES} from "@constants/language.ts";
import {ILanguage} from "@shared/freelancerTypes.ts";
import {
	IFreelancerDraggableLanguage
} from "@components/features/EditModal/LanguagesModalItem/LanguageModalItem/languageModalItemTypes.ts";

export const getLanguageLevelName = (level: number | null) => {
	if (!level) return 'Wybierz poziom';
	return LANGUAGE_LEVEL_NAMES[level - 1];
};

export const getLanguageLevelDescription = (level: number | null) => {
	if (!level) return 'Wybierz poziom';
	return LANGUAGE_LEVEL_DESCRIPTIONS[level - 1];
};

export const getAbsentLanguageNames = (
	allLanguages: ILanguage[],
	existedLanguages: IFreelancerDraggableLanguage[]
): (keyof typeof LANGUAGE_NAMES)[] => {
	return allLanguages.map(language => getLanguageKeyFromEnumByValue(language.name))
		.filter(language => language !== undefined)
		.filter(language => !existedLanguages
			.some(existedLanguage => existedLanguage.language === language)
		);
};

export const getLanguageKeyFromEnumByValue = (
	languageName: string
): keyof typeof LANGUAGE_NAMES | undefined => {

	for (const [key, value] of Object.entries(LANGUAGE_NAMES)) {
		if (value === languageName) {
			return key as keyof typeof LANGUAGE_NAMES;
		}
	}
};

export const getPolishLanguageName = (
	languageNameInEnglish: keyof typeof LANGUAGE_NAMES
) => {
	return LANGUAGE_NAMES[languageNameInEnglish];
}