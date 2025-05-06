import { UserRole } from "@shared/userTypes.ts";

export type OnboardingUser = Exclude<UserRole, 'ADMIN'>;

export interface IOnboardingPageProps {
	userRole: OnboardingUser;
}