import {ISubIndustry} from "@shared/onboardingTypes.ts";
import {ISaveableChildProps} from "@context/ModalContext/ModalContext.ts";

export interface ISubIndustriesModalItemProps extends ISaveableChildProps {
	userSubIndustries: ISubIndustry[];
	onSave: () => void;
}