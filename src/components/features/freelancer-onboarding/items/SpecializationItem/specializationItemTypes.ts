import { ISpecialization } from "@shared/onboarding/freelancerOnboardingTypes.ts";

export interface ISpecializationItemProps {
	item: ISpecialization;
	onSelect: () => void;
	isSelected: boolean;
}