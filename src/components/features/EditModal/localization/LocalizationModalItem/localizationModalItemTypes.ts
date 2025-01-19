import {IFreelancerLocalization} from "@shared/freelancerTypes.ts";
import {ISaveableChildProps} from "@context/ModalContext/ModalContext.ts";
import {WORKING_AREAS} from "@constants/workingAreas.ts";

export interface ILocalizationModalItemProps extends ISaveableChildProps {
	userLocalization: IFreelancerLocalization | null;
	onSave: () => void;
	freelancerWorkingArea: keyof typeof WORKING_AREAS | null;
	freelancerWorkingAreaValue: string | null;
}