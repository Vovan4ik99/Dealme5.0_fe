import { ISaveableChildProps } from "@context/ModalContext/ModalContext.ts";
import { WORKING_AREAS } from "@constants/workingAreas.ts";
import {
	ILocalizationFormState
} from "@components/features/modals/localization/LocalizationForm/localizationFormTypes.ts";
import { IFreelancerLocalization } from "@shared/freelancer/localization.ts";

export interface ILocalizationModalItemProps extends ISaveableChildProps {
	userLocalization: IFreelancerLocalization | null;
	onSave: () => void;
	freelancerWorkingArea: keyof typeof WORKING_AREAS | null;
	freelancerWorkingAreaValue: string | null;
}

export interface IFreelancerLocalizationForm extends ILocalizationFormState {
	workingArea: keyof typeof WORKING_AREAS;
	workingAreaValue: string;
}