import {ISalesTool} from "@shared/onboardingTypes.ts";

export interface ISalesToolsStepProps {
	userTools: ISalesTool[];
	onNext: () => void;
}