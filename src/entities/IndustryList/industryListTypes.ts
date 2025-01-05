import {IIndustry} from "@shared/onboardingTypes.ts";

export interface IIndustryListProps {
	selectedSubIndustries: number[];
	industries: IIndustry[];
	onChange: (newSubIndustry: number) => void;
}