import {ISaveableChildProps} from "@context/ModalContext/ModalContext.ts";
import {IIndustry} from "@shared/onboardingTypes.ts";

export interface IAddSubIndustriesModalItemProps extends ISaveableChildProps {
	industries: IIndustry[];
}