import { UserRole } from "@shared/userTypes.ts";
import { IOnboardingProgressTrackerCategory } from "./OnboardingProgressTracker/onboardingProgressTrackerTypes.ts";

export const ONBOARDING_PROGRESS_TRACKER_CATEGORIES: Record<UserRole, IOnboardingProgressTrackerCategory[]> = {
	INVESTOR: [
		{
			category: 'Potrzeby sprzedażowe',
			subcategories: [ 'Cele sprzedaży', 'Etap organizacji', 'Dział sprzedaży', 'Strategia' ],
		},
		{
			category: 'Biznes / Organizacja',
			subcategories: [ 'Rodzaj biznesu', 'Twoja rola', 'Liczba pracowników', 'Szczegóły' ],
		},
	],
	FREELANCER: [
		{
			category: 'Doświadczenie i specjalizacja',
			subcategories: ['Doświadczenie w sprzedaży', 'Specjalizacja handlowa']
		},
		{
			category: 'Dostępność i zarobki',
			subcategories: ['Dni dostępności', 'Dostępność godzinowa', 'Oczekiwane zarobki']
		},
		{
			category: 'Branża i sektor',
			subcategories: ['Branża', 'Rodzaj sprzedaży', 'Sektor']
		},
		{
			category: 'Umiejętności',
			subcategories: ['Umiejętności', 'Narzędzia Sprzedażowe']
		}
	],
	ADMIN: [

	]
} as const;