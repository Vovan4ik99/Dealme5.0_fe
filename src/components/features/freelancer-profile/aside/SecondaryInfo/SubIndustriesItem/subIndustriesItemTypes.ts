import { ISubIndustry } from "@shared/onboarding/freelancerOnboardingTypes.ts";

export interface ISubIndustriesItemProps {
	userSubIndustries: ISubIndustry[];
	onSave: () => void;
	isLoggedUserProfile: boolean;
}