import {ISubIndustry} from "@shared/onboardingTypes.ts";

export interface IIndustryStepProps {
	onNext: () => void;
	userSubIndustries: ISubIndustry[];
}