import { ISalesTool } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import { ISaveableChildProps } from "@context/ModalContext/ModalContext.ts";

export interface ISalesToolsEditModalItemProps extends ISaveableChildProps{
    allSalesTools: ISalesTool[];
    onSave: (newSalesTools: ISalesTool[]) => void;
}


