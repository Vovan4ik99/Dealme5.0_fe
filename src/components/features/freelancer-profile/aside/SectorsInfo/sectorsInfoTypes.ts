import {ISector} from "@shared/onboarding/freelancerOnboardingTypes.ts";

export interface ISectorsInfoProps {
	isLoggedUserProfile: boolean;
	onSubmit: () => void;
	freelancerSectors: ISector[];
}