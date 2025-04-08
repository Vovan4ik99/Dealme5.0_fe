import { ISector } from "@shared/onboarding/freelancerOnboardingTypes.ts";

export interface ISectorsListModalItemProps {
	freelancerSectors: ISector[];
	onSelect: (sector: ISector) => void;
	onSectorsDrag: (newItems: ISector[]) => void;
}