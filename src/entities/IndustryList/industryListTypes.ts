import { IIndustry } from "@shared/onboarding/freelancerOnboardingTypes.ts";

export interface IIndustryListProps {
	selectedSubIndustries: number[];
	industries: IIndustry[];
	onChange: (newSubIndustry: number) => void;
}