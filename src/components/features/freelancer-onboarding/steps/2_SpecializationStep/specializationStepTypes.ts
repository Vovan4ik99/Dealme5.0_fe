import {ISpecialization} from "@shared/onboardingTypes.ts";

export interface ISpecializationStepProps {
	onNext: () => void;
	userSpecialization: ISpecialization | null;
}