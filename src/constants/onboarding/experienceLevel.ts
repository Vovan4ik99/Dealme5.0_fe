export const EXPERIENCE_LEVELS = {
	BEGINNER: {
		title: 'Brak doświadczenia',
		info: 'Dopiero zaczynam karierę w sprzedaży',
	},
	JUNIOR: {
		title: 'Poniżej 1 roku',
		info: 'Junior',
	},
	INTERMEDIATE: {
		title: '1-2 lata',
		info: 'Średniozaawansowany',
	},
	SENIOR: {
		title: '3-5 lat',
		info: 'Senior',
	},
	EXPERT: {
		title: 'Powyżej 6 lat',
		info: 'Ekspert',
	},
} as const;

export type ExperienceLevelKey = keyof typeof EXPERIENCE_LEVELS;
