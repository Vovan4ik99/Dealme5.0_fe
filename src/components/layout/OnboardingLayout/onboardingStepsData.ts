import { IStepData } from "./onboardingLayoutTypes.ts";
import { UserRole } from "@shared/userTypes.ts";

export const ONBOARDING_STEPS_DATA: Record<UserRole, IStepData[]> = {
	INVESTOR: [
		{
			title: 'Dla jakich celów potrzebujesz aktywności sprzedażowych?',
			subtitle: 'Potrzeby sprzedażowe',
			component: undefined,
		},
		{
			title: 'Na jakim etapie jest Twoja organizacja?',
			subtitle: 'Potrzeby sprzedażowe',
			component: undefined,
		},
		{
			title: 'Czy posiadasz dział sprzedaży, który będzie korzystał z aplikacji?',
			subtitle: 'Potrzeby sprzedażowe',
			component: undefined,
		},
		{
			title: 'Czy posiadasz strategie “go to market” lub proces sprzedaży?',
			subtitle: 'Potrzeby sprzedażowe',
			component: undefined,
		},
		{
			title: 'Jakiego rodzaju biznes prowadzisz?',
			subtitle: 'Biznes / Organizacja',
			component: undefined,
		},
		{
			title: 'Za co odpowiadasz w organizacji?',
			subtitle: 'Biznes / Organizacja',
			component: undefined,
		},
		{
			title: 'Ile osób pracuje w Twojej organizacji?',
			subtitle: 'Biznes / Organizacja',
			component: undefined,
		},
		{
			title: 'Uzupełnij szczegóły',
			subtitle: 'Biznes / Organizacja',
			component: undefined,
		}
	],
	FREELANCER: []
} as const;




