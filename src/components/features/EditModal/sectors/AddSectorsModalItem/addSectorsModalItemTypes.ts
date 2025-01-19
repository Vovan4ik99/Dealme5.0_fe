import {ISaveableChildProps} from "@context/ModalContext/ModalContext.ts";
import {ISector} from "@shared/onboardingTypes.ts";

export interface IAddSectorsModalItemProps extends ISaveableChildProps {
	onSave: (sectors: ISector[]) => void;
	sectorsToChoose: ISector[];
}
