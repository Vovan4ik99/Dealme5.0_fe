import { ISaveableChildProps } from "@context/ModalContext/ModalContext.ts";
import { IIndustry, ISubIndustry } from "@shared/onboarding/freelancerOnboardingTypes.ts";

export interface IAddSubIndustriesModalItemProps extends ISaveableChildProps {
	industries: IIndustry[];
	addSubIndustries: (subIndustries: ISubIndustry[]) => void;
}