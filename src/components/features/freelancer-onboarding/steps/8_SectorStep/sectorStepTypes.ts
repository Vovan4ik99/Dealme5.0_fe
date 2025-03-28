import {ISector} from "@shared/onboardingTypes.ts";

export interface ISectorStepProps {
	userSectors: ISector[];
	onNext: () => void;
}