import {ISalesTool} from "@shared/onboardingTypes.ts";
import { OnSaveCallback } from "@context/ModalContext/ModalContext.ts";

export interface ISalesToolsEditModalItemProps {
    allSalesTools: ISalesTool[];
    registerOnSave?: (onSave: OnSaveCallback) => void;
}


