import { ISubIndustry } from "@shared/onboarding/freelancerOnboardingTypes.ts";

export interface IIndustryStepProps {
	onNext: () => void;
	userSubIndustries: ISubIndustry[];
}