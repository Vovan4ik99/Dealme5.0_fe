import { ISector } from "@shared/onboarding/freelancerOnboardingTypes.ts";

export interface ISectorStepProps {
	userSectors: ISector[];
	onNext: () => void;
}