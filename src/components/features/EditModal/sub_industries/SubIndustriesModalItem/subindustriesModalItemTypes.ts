import { ISubIndustry } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import { ISaveableChildProps } from "@context/ModalContext/ModalContext.ts";

export interface ISubIndustriesModalItemProps extends ISaveableChildProps {
	userSubIndustries: ISubIndustry[];
	onSave: () => void;
}