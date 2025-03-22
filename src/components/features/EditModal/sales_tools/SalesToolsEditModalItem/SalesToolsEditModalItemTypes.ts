import { ISalesTool } from "@shared/onboardingTypes.ts";
import { ISaveableChildProps } from "@context/ModalContext/ModalContext.ts";

export interface ISalesToolsEditModalItemProps extends ISaveableChildProps{
    allSalesTools: ISalesTool[];
    onSave: (newSalesTools: ISalesTool[]) => void;
}


