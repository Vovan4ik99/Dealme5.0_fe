import { API_ROUTES } from "@constants/apiRoutes.ts";

export const PRIORITY_COUNTRY_KEY = "POLAND";

export const SKILL_LEVELS =
	['Początkujący', 'Podstawowy', 'Średniozaawansowany', 'Wyższy średniozaawansowany', 'Zaawansowany'];

export const AUTH_PAGES : string[] = [
	API_ROUTES.AUTH.LOGIN,
	API_ROUTES.AUTH.REGISTER,
	API_ROUTES.TOKEN.PASSWORD_RESET
];

export const MOCKED_INVESTOR_PERMITTED_PAGES = [
	'/investor/service',
	'/investor/onboarding',
];