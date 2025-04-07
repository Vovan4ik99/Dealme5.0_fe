import { IIndustry, ISubIndustry } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import React from "react";

export interface IIndustryListProps {
	selectedSubIndustries: ISubIndustry[];
	industries: IIndustry[];
	setSelectedSubIndustries: (value: React.SetStateAction<ISubIndustry[]>) => void;
}