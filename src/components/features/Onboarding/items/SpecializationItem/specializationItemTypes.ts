import {ISpecialization} from "@shared/onboardingTypes.ts";

export interface ISpecializationItemProps {
	item: ISpecialization;
	onSelect: () => void;
	isSelected: boolean;
}