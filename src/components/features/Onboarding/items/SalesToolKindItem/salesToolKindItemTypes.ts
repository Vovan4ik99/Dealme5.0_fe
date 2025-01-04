import {ISalesTool} from "@shared/onboardingTypes.ts";

export interface ISalesToolKindItemProps {
	text: string;
	salesTools: ISalesTool[];
	selectedSalesTools: number[];
	onChange: (toolId: number) => void;
	isSearchActive: boolean;
	isInSearchRange: boolean;
}