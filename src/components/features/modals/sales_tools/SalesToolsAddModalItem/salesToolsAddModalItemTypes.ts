import { ISalesTool } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import { ISaveableChildProps } from "@context/ModalContext/ModalContext.ts";

export interface ISalesToolsAddModalItemProps extends ISaveableChildProps {
	salesTools: ISalesTool[];
	onSave: (newSalesTools: ISalesTool[]) => void;
}