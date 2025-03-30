import { ISpecialization } from "@shared/onboarding/freelancerOnboardingTypes.ts";

export interface ISpecializationStepProps {
	onNext: () => void;
	userSpecialization: ISpecialization | null;
}