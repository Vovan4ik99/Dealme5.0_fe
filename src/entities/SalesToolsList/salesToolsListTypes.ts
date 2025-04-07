import { ISalesTool } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import React from "react";

export interface ISalesToolsListProps {
	tools: ISalesTool[];
	selectedTools: ISalesTool[];
	setSelectedTools: React.Dispatch<React.SetStateAction<ISalesTool[]>>
}