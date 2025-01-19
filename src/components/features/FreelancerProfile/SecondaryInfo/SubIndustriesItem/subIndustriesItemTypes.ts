import {ISubIndustry} from "@shared/onboardingTypes.ts";

export interface ISubIndustriesItemProps {
	userSubIndustries: ISubIndustry[];
	onSave: () => void;
}