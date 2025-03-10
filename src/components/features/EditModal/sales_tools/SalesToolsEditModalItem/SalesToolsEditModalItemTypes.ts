import {ISalesTool} from "@shared/onboardingTypes.ts";
import {ISaveableChildProps} from "@context/ModalContext/ModalContext.ts";

interface ISalesToolsArray {
    allSalesTools: ISalesTool[];
}

export type ISalesToolsEditModalItemProps = ISalesToolsArray & ISaveableChildProps;
