import { ISalesTool } from "@shared/onboardingTypes.ts";
import { ISaveableChildProps } from "@context/ModalContext/ModalContext.ts";

export interface ISalesToolsAddModalItemProps extends ISaveableChildProps {
	salesTools: ISalesTool[];
	onSave: (newSalesTools: ISalesTool[]) => void;
}