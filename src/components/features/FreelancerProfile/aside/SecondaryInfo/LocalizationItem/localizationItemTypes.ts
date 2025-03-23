import { WORKING_AREAS } from "@constants/workingAreas.ts";
import { IFreelancerLocalization } from "@shared/freelancer/localization.ts";

export interface ILocalizationItemProps {
	isUndefined: boolean;
	userLocalization: IFreelancerLocalization | null;
	onSave: () => void;
	freelancerWorkingArea: keyof typeof WORKING_AREAS | null;
	freelancerWorkingAreaValue: string | null;
	isLoggedUserProfile: boolean;
}