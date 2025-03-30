import { ISalesTool } from "@shared/onboarding/freelancerOnboardingTypes.ts";

export interface ISalesToolsListProps {
	tools: ISalesTool[];
	selectedTools?: number[];
	onChange: (newTool: number) => void;
}