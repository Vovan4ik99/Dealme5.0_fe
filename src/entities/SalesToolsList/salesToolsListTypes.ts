import { ISalesTool } from "@shared/onboardingTypes.ts";

export interface ISalesToolsListProps {
	tools: ISalesTool[];
	selectedTools?: number[];
	onChange: (newTool: number) => void;
}