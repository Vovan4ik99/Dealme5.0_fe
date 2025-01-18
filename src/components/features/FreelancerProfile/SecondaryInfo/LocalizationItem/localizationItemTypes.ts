import {IFreelancerLocalization} from "@shared/freelancerTypes.ts";
import {WORKING_AREAS} from "@constants/workingAreas.ts";

export interface ILocalizationItemProps {
	isUndefined: boolean;
	userLocalization: IFreelancerLocalization | null;
	onSave: () => void;
	freelancerWorkingArea: keyof typeof WORKING_AREAS | null;
	freelancerWorkingAreaValue: string | null;
}