import {ISector} from "@shared/onboardingTypes.ts";

export interface ISectorsListModalItemProps {
	freelancerSectors: ISector[];
	onSelect: (sector: ISector) => void;
	onSectorsDrag: (newItems: ISector[]) => void;
}