import { ISalesTool } from "@shared/onboarding/freelancerOnboardingTypes.ts";

export interface ISalesToolKindItemProps {
	text: string;
	salesTools: ISalesTool[];
	selectedSalesTools: number[];
	onChange: (toolId: number) => void;
	isSearchActive: boolean;
	isInSearchRange: boolean;
}