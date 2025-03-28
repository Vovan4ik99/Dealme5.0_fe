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
	FREELANCER: []
} as const;