import { ISaveableChildProps } from "@context/ModalContext/ModalContext.ts";
import { IIndustry, ISubIndustry } from "@shared/onboardingTypes.ts";

export interface IAddSubIndustriesModalItemProps extends ISaveableChildProps {
	industries: IIndustry[];
	addSubIndustries: (subIndustries: ISubIndustry[]) => void;
}